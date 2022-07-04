import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ShowUserService from '@modules/users/services/ShowUserService';
import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ id });

    return response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const { name, email, password } = request.body;

  //   const updateUser = new UpdateUserService();

  //   const user = await updateUser.execute({
  //     id,
  //     name,
  //     email,
  //     password,
  //   });

  //   return response.json(user);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteUser = new DeleteUserService();

  //   await deleteUser.execute({ id });

  //   return response.json([]);
  // }
}
