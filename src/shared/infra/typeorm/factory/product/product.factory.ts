import { faker } from '@faker-js/faker';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { define } from 'typeorm-seeding';

const products: Product[] = new Array<Product>();

define(Product, () => {
  const product = new Product();

  product.id = faker.datatype.uuid();
  product.name = faker.commerce.product();
  product.price = faker.datatype.number({ min: 10, max: 100, precision: 0.01 });
  product.quantity = faker.datatype.number({ min: 10, max: 100 });

  products.push(product);

  return product;
});
