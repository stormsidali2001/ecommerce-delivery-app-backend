import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";


@Module({
    imports:[],
    providers:[OrderService,PrismaClient],
    controllers:[OrderController]
})
export class OrderModule{}