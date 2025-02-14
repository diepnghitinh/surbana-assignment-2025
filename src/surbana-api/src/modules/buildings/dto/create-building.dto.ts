import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty()
  @IsNotEmpty()
  building_name: string;
}
