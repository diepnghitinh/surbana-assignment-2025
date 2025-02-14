import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  location_name: string;

  @ApiProperty()
  @IsNotEmpty()
  location_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  location_area: number;
}
