import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
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

  @ApiProperty({
    description:
      'The parent ID of a location can be either a building ID or a location ID.',
  })
  @IsNotEmpty()
  location_parent_id: string;
}
