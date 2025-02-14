import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModel } from '../../models/location.model';

@Module({
  imports: [TypeOrmModule.forFeature([LocationModel])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
