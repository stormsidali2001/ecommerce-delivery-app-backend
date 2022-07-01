import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";


@Injectable()
export class SessionSerializer extends PassportSerializer{
    
    serializeUser(user: any, done: Function) {
        Logger.log("Serializing user ...","SessionSerializer/serializeUser")
        
        done(null,user)
      
    }
   async deserializeUser(user: any, done: Function) {
      
            return done(null,user)
    }
  
}