import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { DatabaseModule } from './configs/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    DatabaseModule,
    //Module service
    BuildingsModule,
    LocationsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
