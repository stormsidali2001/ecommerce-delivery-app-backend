import {  HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { EditProductDto, ProductDto } from "src/dto/productsDtos";


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
            if(!admin){
                logger.error("admin not found")
                throw new HttpException("admin not found",HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const newProduct = await this.prisma.product.create({
                data:{
                    ...product,
                    addedBy:{
                        connect:{
                            id:admin.id
                        }
                    }
                    

                },

            })
            return newProduct;
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteProduct(productId:number){
        const logger = new Logger("ProductsService/deleteProduct")
        try{
         const deleted =await    this.prisma.product.delete({
                where:{
                    id:productId,
                }
            })
            return deleted;
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    async editProduct(productId:number,product:EditProductDto){
        const logger = new Logger("ProductsService/editProduct")
        try{
            const edited  =await    this.prisma.product.update({
               data:{
                ...product
               },
               where:{
                id:productId
               }
            })
            return edited;
        }catch(err){
            logger.error(err)
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}