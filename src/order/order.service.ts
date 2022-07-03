import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { OrderStatus, PrismaClient } from "@prisma/client";
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

                  assignedTo:undefined,
                   
                  
                   
                }
            })
         
            return newOrder
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getClientOrders(userId:number){
        const logger = new Logger("OrderService/getClientOrders");

        try{
            return await this.prisma.order.findMany({
                where:{
                    client:{
                        userId
                    },
                },
                include:{
                    products:true,
                    assignedTo:true,
    
                }
            })

        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
     
    }
    async approveOrder(orderId:number){
        const logger = new Logger("OrderService/approveOrder");
        const order = await this.prisma.order.findUnique({
            where:{
                id:orderId
            }
        })
        if(order.status !== OrderStatus.WAIT){
            logger.error(`order is in ${order.status} state (expected: wait)`)
            throw new HttpException(`order is in ${order.status} state (expected: wait)`,HttpStatus.AMBIGUOUS)
        }
        try{
            const newOrder = await this.prisma.order.update({
                data:{
                    status:OrderStatus.APPROVED
                },
                where:{
                    id:orderId
                }
            })

            return newOrder;

        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }

      
    }

    async assignOrderToDeliveryMan(orderId:number,deliveryManId:number){
        const logger = new Logger("OrderService/assignOrderToDeliveryMan");
        try{
            const order = await this.prisma.order.findUnique({
                where:{
                    id:orderId
                }
            })
            if(order.status !== OrderStatus.APPROVED ){
                logger.error(`order is in ${order.status} state (expected: approved)`)
                throw new HttpException(`order is in ${order.status} state (expected: approved)`,HttpStatus.AMBIGUOUS)
            }
            await this.prisma.order.update({
                where:{
                    id:orderId
                },
                data:{
                    assignedTo:{
                        connect:{
                            id:deliveryManId
                        },
                    },
                    status:OrderStatus.ASSIGNED

                }
            })
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
}