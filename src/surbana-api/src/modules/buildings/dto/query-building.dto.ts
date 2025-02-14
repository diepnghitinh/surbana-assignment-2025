import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryBuildingDto {
  // @ApiPropertyOptional({ description: 'Building name params filter' })
  // @IsOptional()
  // building_name: string;
}
