import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ProductDto } from "src/dto/productsDtos";


@Injectable()
export class ProductsService{
    constructor(
        private readonly prisma:PrismaClient
    ){ }
    async addProduct(product:ProductDto,userId:number){
        const logger = new Logger("ProductsService/addProduct")
        try{
            const admin = await this.prisma.admin.findUnique({
                where:{
                    userId
                }
            })
            const newProduct = await this.prisma.product.create({
                data:{
                    ...product,
                    adminId:admin.id
                },

            })
            return newProduct;
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}