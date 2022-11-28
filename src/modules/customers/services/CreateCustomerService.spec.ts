import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('Create Customer', () => {
  const objCustomer = {
    name: 'John Doe',
    email: 'johndoe@teste.com.br',
  }

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute(objCustomer);

    expect(customer).toEqual({
      id: expect.any(String),
      ...objCustomer,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    })
  });

  it('should not be able to create two customers with same email', async () => {
    await createCustomer.execute({
      name: 'John Doe',
      email: 'johndoe@teste.com.br',
    });

    expect(
      createCustomer.execute({
        name: 'John Doe',
        email: 'johndoe@teste.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
