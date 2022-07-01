import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcryptjs';
import { AdminRegistrationDto, ClientRegistrationDto, DeliveryManRegistrationDto } from "src/dto/registrationDtos";



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
    async signUpClient(client:ClientRegistrationDto){
            const {
                email,
                password,
                dob,
                address,
                firstName,
                lastName,
                ssn,
                phoneNumber
            } = client;
            const user = this.prisma.user.findUnique({where:{
                email
            }})
            const hashedPassword = await bcrypt.hash(password,10);
            
    }
    async signUpDeliveryMan(deliveryMan:DeliveryManRegistrationDto){
            
    }
    async signUpAdmin(admin:AdminRegistrationDto){
            
    }

}