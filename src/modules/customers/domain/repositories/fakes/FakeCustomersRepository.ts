import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

class FakeCustomersRepository
  implements Omit<ICustomersRepository, 'remove' | 'findAll'>
{
  private customers: Customer[] = [];



  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    customer.created_at = new Date();
    customer.updated_at = new Date();

    this.customers.push(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const index = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers.splice(index, 1)
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const result = {
      per_page: take,
      total: this.customers.length,
      current_page: page,
      data: this.customers,
    };
    return result;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
