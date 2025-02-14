import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDto } from './create-building.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBuildingDto extends CreateBuildingDto {}
