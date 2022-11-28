import AppError from "@shared/errors/AppError";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import ShowCustomerService from "./ShowCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;
let createCustomer: CreateCustomerService;
let showCustomer: ShowCustomerService;

describe('Delete Customer', () => {
  const objCustomer = {
    name: 'John Doe',
    email: 'johndoe@teste.com.br',
  }

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });

  it('deve remover customer quando id informado for válido', async () => {
    const customer = await createCustomer.execute(objCustomer);
    await deleteCustomer.execute(customer)

    await showCustomer.execute(customer).catch(error => {
      expect(error).toBeInstanceOf(AppError)
      expect(error.message).toMatch(new RegExp("Customer not found."))
    });
  });

  it('deve exibir mensagem de erro quando id não for informado', async () => {
    let id = ''

    await deleteCustomer.execute({ id }).catch(error => {
      expect(error).toBeInstanceOf(AppError)
      expect(error.message).toMatch(new RegExp("Id not informed."))
    });
  });

  it('deve exibir mensagem de erro quando id for invalido', async () => {
    let id = 'a6fb61bb-9dd9-4298-a397-1525c8'

    await deleteCustomer.execute({ id }).catch(error => {
      expect(error).toBeInstanceOf(AppError)
      expect(error.message).toMatch(new RegExp("Invalid id."))
    })
  })
})
