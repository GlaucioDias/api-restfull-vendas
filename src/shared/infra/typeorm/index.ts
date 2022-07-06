import { DataSource, DataSourceOptions } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateTableProducts1629163144617 } from './migrations/1629163144617-CreateTableProducts';
import { CreateTableUsers1629289392750 } from './migrations/1629289392750-CreateTableUsers';
import { CreateTableUserTokens1629380722915 } from './migrations/1629380722915-CreateTableUserTokens';
import { CreateTableCustomers1629486127659 } from './migrations/1629486127659-CreateTableCustomers';
import { CreateTableOrders1629677209502 } from './migrations/1629677209502-CreateTableOrders';
import { AddCustomerIdToOrders1629677535784 } from './migrations/1629677535784-AddCustomerIdToOrders';
import { CreateTableOrdersProducts1629678258805 } from './migrations/1629678258805-CreateTableOrdersProducts';
import { AddOrderIdToOrdersProducts1629678532712 } from './migrations/1629678532712-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1629678979171 } from './migrations/1629678979171-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateTableProducts1629163144617,
    CreateTableUsers1629289392750,
    CreateTableUserTokens1629380722915,
    CreateTableCustomers1629486127659,
    CreateTableOrders1629677209502,
    AddCustomerIdToOrders1629677535784,
    CreateTableOrdersProducts1629678258805,
    AddOrderIdToOrdersProducts1629678532712,
    AddProductIdToOrdersProducts1629678979171,
  ],
});
