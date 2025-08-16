import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder(order: { userId: string; productId: string }) {
    this.kafkaClient.emit('order.created', JSON.stringify(order));
    return { message: 'Order created successfully!', order };
  }

  createMessage(createMessageDto: CreateMessageDto) {
    this.kafkaClient.emit('message.created', JSON.stringify(createMessageDto));
    return { message: 'Message created successfully!', data: createMessageDto };
  }
}
