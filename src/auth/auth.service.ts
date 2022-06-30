import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class AuthService{

    constructor(
            private readonly prisma:PrismaClient  
        ){

    }
    async signin(email:string , password:string){
        const logger = new Logger("AuthService/signin");
        try{
        
        }catch(err){
            logger.error(err);
            throw new HttpException(err,HttpStatus.FORBIDDEN);
            
        }
    }

}