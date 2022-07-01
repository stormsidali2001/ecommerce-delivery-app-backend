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
        const logger = new Logger("AuthService/signUpClient")
        try{
            const {
                email,
                password,
                ...others
            } = client;
          
            const user = await this.prisma.user.findUnique({
                where:{
                    email
                }
            });
            if(user){
                logger.error("email already exist");
                throw new HttpException("email already exist",HttpStatus.FORBIDDEN);
            }
            const hashedPassword = await bcrypt.hash(password,10);
          
            const newClient = await this.prisma.client.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword
                        }
                    }
                }
            })

            return newClient;


        }catch(err){
            logger.error(err);
            throw new HttpException(err,HttpStatus.FORBIDDEN);
        }
         
            
    }
    async signUpDeliveryMan(deliveryMan:DeliveryManRegistrationDto){
        const logger = new Logger("AuthService/signUpDeliveryMan")
        try{
            const {
                email,
                password,
                ...others
            } = deliveryMan;
          
            const user = await this.prisma.user.findUnique({
                where:{
                    email
                }
            });
            if(user){
                logger.error("email already exist");
                throw new HttpException("email already exist",HttpStatus.FORBIDDEN);
            }
            const hashedPassword = await bcrypt.hash(password,10);
          
            const newDl = await this.prisma.deliveryMan.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword
                        }
                    }
                }
            })

            return newDl;


        }catch(err){
            logger.error(err);
            throw new HttpException(err,HttpStatus.FORBIDDEN);
        }
            
    }
    async signUpAdmin(admin:AdminRegistrationDto){
        const logger = new Logger("AuthService/signUpDeliveryMan")
        try{
            const {
                email,
                password,
                ...others
            } = admin;
          
            const user = await this.prisma.user.findUnique({
                where:{
                    email
                }
            });
            if(user){
                logger.error("email already exist");
                throw new HttpException("email already exist",HttpStatus.FORBIDDEN);
            }
            const hashedPassword = await bcrypt.hash(password,10);
          
            const newAdmin = await this.prisma.admin.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword
                        }
                    }
                }
            })

            return newAdmin;


        }catch(err){
            logger.error(err);
            throw new HttpException(err,HttpStatus.FORBIDDEN);
        }

    }
   





}
