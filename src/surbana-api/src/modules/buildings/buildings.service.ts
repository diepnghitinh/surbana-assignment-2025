import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BuildingModel } from '../../models/building.model';
import { PaginationService } from '../../shared/modules/pagination/services/pagination.service';
import { PaginationOptions } from '../../shared/modules/pagination/interfaces/pagination.options';
import { QueryBuildingDto } from './dto/query-building.dto';
import { ConfigService } from '@nestjs/config';
import { CreateBuildingDto } from './dto/create-building.dto';
import { LocationModel } from '../../models/location.model';
import { uid_to_path } from '../../shared/utils/auth';
import { UpdateLocationDto } from '../locations/dto/update-location.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectDataSource()
    private _dataSource: DataSource,
    @InjectRepository(BuildingModel)
    private _buildingRepository: Repository<BuildingModel>,
    @InjectRepository(LocationModel)
    private _locationRepository: Repository<LocationModel>,
    private readonly _paginationService: PaginationService,
    private configService: ConfigService,
  ) {}

  async create(createTenantDto: CreateBuildingDto) {
    const newBuilding = this._buildingRepository.create({
      building_name: createTenantDto.building_name,
    });
    await this._buildingRepository.save(newBuilding);
    await this._locationRepository
      .create({
        id: newBuilding.id,
        location_name: createTenantDto.building_name,
        location_number: `${createTenantDto.building_name}`,
        location_area: -1,
        location_path: `${uid_to_path(newBuilding.id)}`,
        building_id: newBuilding.id,
      })
      .save();
    return newBuilding;
  }

  findAllV1(paging: PaginationOptions, options: QueryBuildingDto) {
    return this._paginationService.paginate<BuildingModel>(
      this._buildingRepository,
      paging,
      {
        order: {
          created_at: 'DESC',
        },
      },
    );
  }

  async findOne(buildingId: string) {
    const building = await this._buildingRepository.findOne({
      where: { id: buildingId },
    });
    return building;
  }

  update(buildingId: string, updateBuildingDto: UpdateBuildingDto) {
    const building = this._buildingRepository.update(
      {
        id: buildingId,
      },
      updateBuildingDto,
    );
    this._locationRepository.update(
      {
        id: buildingId,
      },
      {
        location_name: updateBuildingDto.building_name,
      },
    );
    return building;
  }

  delete(buildingId: string) {
    const building = this._buildingRepository.softDelete({
      id: buildingId,
    });
    return building;
  }
}
