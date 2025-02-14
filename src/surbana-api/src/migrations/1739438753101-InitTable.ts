import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1739438753101 implements MigrationInterface {
    name = 'InitTable1739438753101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buildings" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version_id" character varying(100), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "building_name" character varying(100) NOT NULL, CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version_id" character varying(100), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location_name" character varying(100) NOT NULL, "location_number" character varying(100) NOT NULL, "location_area" numeric NOT NULL, "building_id" uuid, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_de403932deffc1ea20542f5ac04" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_de403932deffc1ea20542f5ac04"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
    }

}
