import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedFilename1712068887968 implements MigrationInterface {
  name = 'AddedFilename1712068887968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD "fileName" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "fileName"`);
  }
}
