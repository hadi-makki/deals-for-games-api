import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1710172992731 implements MigrationInterface {
  name = 'Users1710172992731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD "userId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_0db866835bf356d896e1892635d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_0db866835bf356d896e1892635d"`,
    );
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "userId"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
