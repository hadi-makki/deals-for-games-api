import { MigrationInterface, QueryRunner } from "typeorm";

export class Media1709307329949 implements MigrationInterface {
    name = 'Media1709307329949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "s3Key" character varying NOT NULL, "originalName" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9604f167df8910449165585fa60" PRIMARY KEY ("id", "s3Key"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
