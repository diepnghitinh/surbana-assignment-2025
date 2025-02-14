import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1665977334200 implements MigrationInterface {
  name = 'InitDB1665977334200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "ltree"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
