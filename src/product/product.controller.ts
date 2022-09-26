import { Controller, ParseIntPipe, OnModuleInit, Inject, Post, Get, UseGuards, Body, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from "rxjs";
import { CreateProductRequest, CreateProductResponse, FindOneResponse, ProductServiceClient, PRODUCT_SERVICE_NAME } from './product.pb';

@Controller('product')
export class ProductController implements OnModuleInit {
    private svc: ProductServiceClient;

    @Inject(PRODUCT_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
    }

    @Post()
    @UseGuards(AuthGuard)
    private async createProduct(@Body() body: CreateProductRequest): Promise<Observable<CreateProductResponse>>{
        return this.svc.createProduct(body)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    private async findOne(@Param('id', ParseIntPipe) productId: number): Promise<Observable<FindOneResponse>>{
        return this.svc.findOne({ productId })
    }


}
