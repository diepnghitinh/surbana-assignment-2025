import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('health-check')
export class HealthController {
  constructor(
    private health: HealthCheckService,

    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const checkDatabase = await this._dataSource.query('SELECT 1');
    if (checkDatabase) {
      return this.health.check([]);
    }
    throw new HttpException(`Unhealthy`, HttpStatus.BAD_REQUEST);
  }
}
