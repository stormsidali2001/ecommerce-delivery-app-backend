import { Body, Controller, Delete, HttpException, HttpStatus, ParseIntPipe, Post, Put } from "@nestjs/common";
import { GetCurrentUser } from "src/common/decorators/get-current-user";
import { GetCurrentUserId } from "src/common/decorators/get-current-user-id.decorator";
import { EditProductDto, ProductDto } from "src/dto/productsDtos";
import { ProductsService } from "./products.service";


@Controller("products")
export class ProductsController{
    constructor(
        private readonly productsService:ProductsService
    ){}

    @Post("add")
    addProduct(@Body() product:ProductDto,@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'admin')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.productsService.addProduct(product,user.id)
    }   

    @Put('update')
    async editProduct(@Body('productId',ParseIntPipe) productId:number,@Body('data') product:EditProductDto,@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'admin')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.productsService.editProduct(productId,product)
    }
    @Delete('delete')
    async deleteProduct(@Body('productId',ParseIntPipe) productId:number,@GetCurrentUser() user){
        if(!user.roles.some(el=>el.name === 'admin')){
            throw new HttpException("permission denied",HttpStatus.FORBIDDEN);
        }
        return this.productsService.deleteProduct(productId)
    }
    
}