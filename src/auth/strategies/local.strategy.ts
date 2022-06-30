import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private  readonly authService:AuthService
    ){
        super({usernameField:'email'});
    }
    async validate(email: string, password: string): Promise<any> {
        let user = null;
        try{
             user = await this.authService.signin(email,password)
             if (!user) {
                throw new UnauthorizedException();
              }
    
              return user; // passport creates a user property on the request object
        }catch(err){
            Logger.error(err,'LocalStrategy/validate')
            throw new HttpException(err,HttpStatus.UNAUTHORIZED);
        }
    }
}