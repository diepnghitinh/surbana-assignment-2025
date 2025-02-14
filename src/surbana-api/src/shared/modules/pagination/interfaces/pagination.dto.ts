import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { MAX_LIMIT } from '../services/pagination.service';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  skip: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  limit: number = MAX_LIMIT;

  setSkip(value) {
    this.skip = value;
    return this;
  }

  setLimit(value) {
    this.limit = value;
    return this;
  }
}
