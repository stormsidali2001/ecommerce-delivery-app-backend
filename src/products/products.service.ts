import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class ProductsService{
    constructor(
        private readonly prisma:PrismaClient
    ){}
}