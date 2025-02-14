import { Module } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsController } from './buildings.controller';
import { BuildingModel } from '../../models/building.model';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BuildingsService } from './buildings.service';
import { LocationModel } from '../../models/location.model';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuildingModel, LocationModel]),
    NestjsFormDataModule,
    PaginationModule,
  ],
  controllers: [BuildingsController],
  providers: [ConfigService, BuildingsService],
})
export class BuildingsModule {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
}
