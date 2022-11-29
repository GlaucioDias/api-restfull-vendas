import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import User from '@modules/users/infra/typeorm/entities/User';
import { hashSync } from 'bcryptjs';

const users: User[] = new Array<User>();

define(User, () => {
  const user = new User();
  const salt = 8
  const password = '123456'

  user.id = faker.datatype.uuid();
  user.name = faker.name.firstName();
  user.email = faker.internet.email().toLocaleLowerCase();
  user.password = hashSync(password, salt);

  users.push(user);

  return user;
});

