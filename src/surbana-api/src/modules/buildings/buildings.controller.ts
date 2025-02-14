import {
  Controller,
  Version,
  DefaultValuePipe,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  Headers,
  UseGuards,
  UsePipes,
  ValidationPipe, Put,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { QueryBuildingDto } from './dto/query-building.dto';
import {
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginationDto } from '../../shared/modules/pagination/interfaces/pagination.dto';
import { SerializerInterceptor } from '../../shared/dto/serializer.interceptor';
import { BuildingsSerializer } from './buildings.serializer';
import { UpdateLocationDto } from '../locations/dto/update-location.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@ApiTags('Buildings')
@Controller('buildings')
// @ApiSecurity('X-Api-Key')
// @UseGuards(ApiKeyGuard)
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new building' })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingsService.create(createBuildingDto);
  }

  @Version(['', 'v1'])
  @Get()
  @ApiOperation({ summary: 'Retrieve a list of buildings' })
  @UseInterceptors(new SerializerInterceptor(BuildingsSerializer, ''))
  findAllV1(
    @Query() filterPaginationDto: PaginationDto,
    @Query() options: QueryBuildingDto,
  ) {
    return this.buildingsService.findAllV1(filterPaginationDto, options);
  }

  @Get(':building_id')
  @ApiOperation({ summary: 'Retrieve a single building' })
  findOne(@Param('building_id') buildingId: string) {
    return this.buildingsService.findOne(buildingId);
  }

  @Put(':building_id')
  @ApiOperation({ summary: 'Updates a building' })
  update(
    @Param('building_id') buildingId: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingsService.update(buildingId, updateBuildingDto);
  }

  @Delete(':building_id')
  @ApiOperation({ summary: 'Delete a building' })
  remove(@Param('building_id') buildingId: string) {
    return this.buildingsService.delete(buildingId);
  }
}
