import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Curtomer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class updateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customer> {
    const customerersRepository = getCustomRepository(CustomersRepository);

    const customer = await customerersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await customerersRepository.findByEmail(email);

    if (customerExists && customer.email !== email) {
      throw new AppError('There is already one customer with this email.');
    }
    }

    customer.name = name;
    customer.email = email;

    await customerersRepository.save(customer);

    return user;
  }
}

export default updateCustomerService;
