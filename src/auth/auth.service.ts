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
            const clientRole = await this.prisma.role.findUnique({
                where:{
                    name:'client'
                }
            })
            const newClient = await this.prisma.client.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword,
                            roles:{
                                [clientRole?'connect':'create']:{
                                    name:clientRole?clientRole.name:'client'
                                   }
                            }
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
            const deliveryManRole = await this.prisma.role.findUnique({
                where:{
                    name:'deliveryMan'
                }
            })
            const newDl = await this.prisma.deliveryMan.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword,
                            roles:{
                                [deliveryManRole?'connect':'create']:{
                                    name:deliveryManRole?deliveryManRole.name:'deliveryMan'
                                   }
                            }
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
            const adminRole = await this.prisma.role.findUnique({
                where:{
                    name:'admin'
                }
            })
           
            const newAdmin = await this.prisma.admin.create({
                data:{
                    ...others,
                    user:{
                        create:{
                            email,
                            password:hashedPassword,
                            roles:{
                               [adminRole?'connect':'create']:{
                                name:adminRole?adminRole.name:'admin'
                               }
                            }
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
