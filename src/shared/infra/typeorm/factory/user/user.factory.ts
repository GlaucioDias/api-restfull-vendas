import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import User from '@modules/users/infra/typeorm/entities/User';

const users: User[] = new Array<User>();

define(User, () => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.name = faker.name.firstName();
  user.email = faker.internet.email().toLocaleLowerCase();
  user.password = faker.internet.password();

  users.push(user);

  return user;
});
