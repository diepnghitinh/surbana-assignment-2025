import { MigrationInterface, QueryRunner } from "typeorm";

export class AfterLocationAllowNull1739471230033 implements MigrationInterface {
    name = 'AfterLocationAllowNull1739471230033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" ADD "building" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "building"`);
    }

}
