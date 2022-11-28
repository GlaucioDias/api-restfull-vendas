import { Factory, Seeder } from 'typeorm-seeding';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default class CustomerSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Customer)().createMany(5);
  }
}
