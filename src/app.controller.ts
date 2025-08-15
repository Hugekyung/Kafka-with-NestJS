import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

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

  @MessagePattern('order.created')
  handleOrderCreated(@Payload() message: any) {
    console.log('--- New Order Received ---');
    console.log('Order Details:', message);
    console.log('--------------------------');
  }
}
