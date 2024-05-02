import { GlobalHelper } from '../../helpers/global.helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1714629993729 implements MigrationInterface {
  private globalHelper = new GlobalHelper();

  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = [
      {
        name: 'Admin Dummy',
        email: 'admin@gmail.com',
        password: await this.globalHelper.encryptPassword('Admin123'),
      },
    ];

    data.map(async (val) => {
      await queryRunner.query(
        `INSERT INTO users(name,email,password) VALUES ('${val.name}','${val.email}','${val.password}')`,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
