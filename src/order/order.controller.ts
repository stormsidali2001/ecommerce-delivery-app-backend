import { Body, Controller, Get, HttpException, HttpStatus, ParseIntPipe, Post, Put } from "@nestjs/common";
import { GetCurrentUser } from "src/common/decorators/get-current-user";
import { OrderDto } from "src/dto/orderDtos";
import { OrderService } from "./order.service";


@Controller('order')
export class OrderController{
    constructor(
        private readonly orderService:OrderService
    ){}

    @Post("create")
    async createOrder(@Body() order:OrderDto,@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'client')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.orderService.createOrder(order,user.id)
    }

    @Get("client")
    async getClientOrders(@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'client')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.orderService.getClientOrders(user.id)
    }

    @Put("approve")
    approveOrder(@Body("orderId",ParseIntPipe) orderId:number,@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'admin')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.orderService.approveOrder(orderId);
    }

    @Put("to-delivery-man")
    async assignOrderToDeliveryMan(@GetCurrentUser() user,
        @Body("orderId",ParseIntPipe) orderId:number,
        @Body("deliveryManId",ParseIntPipe) deliveryManId:number
    ){
        if(!user.roles.some(el=>el.name === 'admin')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return await this.orderService.assignOrderToDeliveryMan(orderId,deliveryManId);
    }

    @Get("delivery-man")
    async getDeliveryManOrders(@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'deliveryMan')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.orderService.getDeliveryManOrders(user.id);
    }
}