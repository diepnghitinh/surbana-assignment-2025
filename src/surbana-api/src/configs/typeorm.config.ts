import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

dotenv.config({ path: `.env.${process.env.ENVIRONMENT || 'development'}` });

const configService = new ConfigService();

const dbConfig = {
  type: configService.get('DATABASE_TYPE', 'postgres') as 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASS', ''),
  database: configService.get<string>('DATABASE_NAME', 'api-service'),
  entities: ['**/*.model{.js,ts}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
    ssl:
      configService.get('SSL_MODE', false) == 'true'
        ? {
            rejectUnauthorized: !configService.get<boolean>('SSL_MODE', false),
          }
        : null,
  },
  ssl: configService.get('SSL_MODE', false),
  synchronize: false,
  logging: true,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['dist/migrations/**/*.js'],
  migrationsRun: true,
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: './migrations',
  },
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return dbConfig;
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = dbConfig;

export default new DataSource(dbConfig);
