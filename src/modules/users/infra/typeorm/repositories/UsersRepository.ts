import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Like, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findAllPaginate(
    search: string,
    sortField: string,
  ): Promise<IPaginateUser> {
    if (search) {
      return (await this.ormRepository
        .createQueryBuilder()
        .where([{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }])
        .orderBy(`User.name`, 'ASC')
      )
    }

    return (await this.ormRepository
      .createQueryBuilder()
      .orderBy('User.name', 'ASC')
    )
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOneBy({ name });

    return user!;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOneBy({ id });

    return user!;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOneBy({ email });

    return user!;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
