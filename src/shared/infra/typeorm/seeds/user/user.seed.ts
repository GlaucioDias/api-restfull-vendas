import { Factory, Seeder } from 'typeorm-seeding';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UserSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create();
  }
}
