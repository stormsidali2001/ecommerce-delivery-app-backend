import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
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


}