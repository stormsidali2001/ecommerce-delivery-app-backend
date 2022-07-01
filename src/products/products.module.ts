import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports:[],
    providers:[ProductsService,PrismaClient],
    controllers:[ProductsController]
})
export class ProductsModule{}