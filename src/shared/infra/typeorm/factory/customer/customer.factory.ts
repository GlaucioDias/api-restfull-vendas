import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

const customers: Customer[] = new Array<Customer>();

define(Customer, () => {
  const customer = new Customer();

  customer.id = faker.datatype.uuid();
  customer.name = faker.name.firstName();
  customer.email = faker.internet.email().toLocaleLowerCase();

  customers.push(customer);

  return customer;
});
