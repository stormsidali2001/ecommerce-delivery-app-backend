import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";



@Module({
    providers:[AuthService,PrismaClient,LocalStrategy],
    controllers:[AuthController]
})
export class AuthModule{}