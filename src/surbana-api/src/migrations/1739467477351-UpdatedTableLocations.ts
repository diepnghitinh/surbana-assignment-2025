import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTableLocations1739467477351 implements MigrationInterface {
    name = 'UpdatedTableLocations1739467477351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" ADD "location_path" ltree NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "location_path"`);
    }

}
