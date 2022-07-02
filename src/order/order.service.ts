import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderDto } from "src/dto/orderDtos";



@Injectable()
export class OrderService{
    constructor(
        private readonly prisma:PrismaClient
    ){}

    async createOrder(order:OrderDto,userId:number){
        const logger = new Logger("OrderService/createOrder");
        try{
            const products = await this.prisma.product.findMany({
                where:{
                    id:{
                        in:order.cart.map(({productId})=>{return productId})
                    }
                }
            })
            const {cart} = order;
            if(products.length !== cart.length){
                logger.error("wrong product ids")
                throw new HttpException("wrong product ids",HttpStatus.INTERNAL_SERVER_ERROR)
            }
            for(let i = 0;i<products.length;i++){
                const {quantity} = cart[i];
                const product = products[i];
                if(quantity > product.quantity){
                    logger.error(`can't buy ${quantity} of ${product.name} (only ${product.quantity} units are available) order failed`)
                    throw new HttpException(`can't buy ${quantity} of ${product.name} (only ${product.quantity} units are available) order failed`,HttpStatus.AMBIGUOUS)
                }
            }

          const newOrder =  await  this.prisma.order.create({
                data:{
                   client:{
                    connect:{
                        userId
                    },
                   },
                   products:{
                    createMany:{
                        data:cart.map(({productId,quantity})=>{return {productId,quantity}})
                        
                    }
                   },
               
                   
                  
                   
                }
            })
         
            return newOrder
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}