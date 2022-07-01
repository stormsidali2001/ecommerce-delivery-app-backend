import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";



@Module({
    imports:[PassportModule.register({session:true})],
    providers:[AuthService,PrismaClient,LocalStrategy,
   
    ],
    controllers:[AuthController]
})
export class AuthModule{}