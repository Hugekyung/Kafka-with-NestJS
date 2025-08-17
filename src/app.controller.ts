import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/orders')
  createOrder(@Body() orderData: { userId: string; productId: string }) {
    return this.appService.createOrder(orderData);
  }

  @Post('/messages')
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.appService.createMessage(createMessageDto);
  }

  @MessagePattern('order.created')
  handleOrderCreated(@Payload() message: any) {
    console.log('--- New Order Received ---');
    console.log('Order Details:', message);
    console.log('--------------------------');
  }

  @MessagePattern('message.created')
  handleMessageCreated(@Payload() message: CreateMessageDto) {
    console.log('--- New Message Received ---');
    console.log('Message Details:', message);
    console.log('로직 수행 !');
    console.log('----------------------------');
  }
}
