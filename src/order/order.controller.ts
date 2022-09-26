import { Controller, OnModuleInit, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from "rxjs";
import { Request } from "express";
import { CreateOrderRequest, CreateOrderResponse, OrderServiceClient, ORDER_SERVICE_NAME } from './order.pb';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController implements OnModuleInit {
    private svc: OrderServiceClient;

    @Inject(ORDER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit():void {
        this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createOrder(@Req() req: Request): Promise<Observable<CreateOrderResponse>>{
        const body: CreateOrderRequest = req.body
        
        //body.userId = <number>req.user
        body.userId = 1

        return this.svc.createOrder(body)
    }
}
