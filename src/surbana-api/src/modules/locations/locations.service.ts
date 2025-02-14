import * as uuid from 'uuid';
import { Body, Injectable } from '@nestjs/common';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { PaginationDto } from '../../shared/modules/pagination/interfaces/pagination.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QueryLocationSubordinateDto } from './dto/query-location.dto';
import { values, replace } from 'lodash';
import { LocationModel } from '../../models/location.model';
import { uid_to_path } from '../../shared/utils/auth';

@Injectable()
export class LocationsService {
  constructor(
    @InjectDataSource()
    private _dataSource: DataSource,
    @InjectRepository(LocationModel)
    private _locationRepository: Repository<LocationModel>,
  ) {}

  async create(@Body() createLocationDto: CreateLocationDto) {
    const newObj = await this._dataSource.transaction(async (manager) => {
      const parentLocation = await this._locationRepository.findOne({
        where: { id: createLocationDto.location_parent_id },
      });
      const newLocationId = uuid.v4();
      return this._locationRepository
        .create({
          id: newLocationId,
          location_name: createLocationDto.location_name,
          location_number: createLocationDto.location_number,
          location_area: createLocationDto.location_area,
          location_path: `${parentLocation.location_path}.${uid_to_path(
            newLocationId,
          )}`,
          building_id: parentLocation.building_id,
        })
        .save();
    });
    return newObj;
  }

  async getLocationsSubordinate(
    queryPagingDto: PaginationDto,
    queryLocationsSubordinateDto: QueryLocationSubordinateDto,
  ) {
    let q = this._dataSource;
    q = await q.query(
      `
        WITH one_of_locations AS ( 
           SELECT id, location_path
           FROM locations WHERE locations.location_path ~ '*.${replace(
             queryLocationsSubordinateDto.location_id,
             /-/g,
             '',
           )}.*{${Number(queryPagingDto.skip)},${
        Number(queryPagingDto.limit) + Number(queryPagingDto.skip)
      }}'
        )
        SELECT "r1"."id" id, "r1"."location_name" location_name, "r1"."location_number" location_number, "r1"."location_area" location_area, "r1"."location_path" location_path, COUNT("r2"."id") child_count 
        FROM "locations" "r1" 
        INNER JOIN one_of_locations ON r1.id = one_of_locations.id 
        LEFT JOIN "locations" "r2" ON "r2"."location_path" <@ "r1"."location_path" AND r1.id!="r2"."id" AND nlevel("r2"."location_path") = nlevel("r1"."location_path") + 1 
        WHERE "r1"."deleted_at" IS NULL 
        GROUP BY "r1"."id"
    `,
      [],
    );
    return values(q);
  }

  findOne(locationId: string) {
    const location = this._locationRepository.findOne({
      where: { id: locationId },
    });
    return location;
  }

  update(locationId: string, updateLocationDto: UpdateLocationDto) {
    return this._locationRepository.update(
      { id: locationId },
      {
        location_name: updateLocationDto.location_name,
        location_number: updateLocationDto.location_number,
        location_area: updateLocationDto.location_area,
      },
    );
  }

  async delete(locationId: string) {
    const location = this._locationRepository.softDelete({
      id: locationId,
    });
    const q = this._dataSource;
    await q.query(
      `
        UPDATE locations SET deleted_at = NOW() WHERE locations.location_path ~ '*.${replace(
          locationId,
          /-/g,
          '',
        )}.*'
    `,
      [],
    );
    return location;
  }
}
