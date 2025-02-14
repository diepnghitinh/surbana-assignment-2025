import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryLocationSubordinateDto {
  @ApiPropertyOptional({
    description:
      'Building or Location Id will be the first node of the tree list.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  location_id: string;
}
