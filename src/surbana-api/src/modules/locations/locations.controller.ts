import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, UseInterceptors, Put,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { PaginationDto } from '../../shared/modules/pagination/interfaces/pagination.dto';
import { QueryLocationSubordinateDto } from './dto/query-location.dto';
import { SerializerInterceptor } from '../../shared/dto/serializer.interceptor';
import { BuildingsSerializer } from '../buildings/buildings.serializer';
import { LocationsSerializer } from './locations.serializer';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of locations through subordinate' })
  @UseInterceptors(new SerializerInterceptor(LocationsSerializer, ''))
  async getLocationsSubordinate(
    @Query() queryLocationsPagingDto: PaginationDto,
    @Query() queryLocationsSubordinateDto: QueryLocationSubordinateDto,
  ) {
    return await this.locationsService.getLocationsSubordinate(
      queryLocationsPagingDto,
      queryLocationsSubordinateDto,
    );
  }

  @Get(':location_id')
  @ApiOperation({ summary: 'Retrieve a single Location' })
  findOne(@Param('location_id') locationId: string) {
    return this.locationsService.findOne(locationId);
  }

  @Put(':location_id')
  @ApiOperation({ summary: 'Updates a location' })
  update(
    @Param('location_id') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(locationId, updateLocationDto);
  }

  @Delete(':location_id')
  @ApiOperation({ summary: 'Delete a location & subordinate' })
  delete(@Param('location_id') locationId: string) {
    return this.locationsService.delete(locationId);
  }
}
