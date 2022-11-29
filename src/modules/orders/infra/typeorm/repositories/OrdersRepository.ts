import { Repository } from 'typeorm';
import Order from '../entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { dataSource } from '@shared/infra/typeorm';

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.ormRepository.findOne({
      relations: {
        order_products: true,
        customer: true,
      },
      where: { id },
    });

    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
