import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserSigninDTO } from "src/dto/registrationDtos";
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
             console.log("validate")
             const userDto = new UserSigninDTO(email,password);
              console.log(userDto)
             user = await this.authService.signin(userDto)
           
    console.log(user,'user')
              return user; // passport creates a user property on the request object
        }catch(err){
            Logger.error(err,'LocalStrategy/validate')
            throw new HttpException(err,HttpStatus.UNAUTHORIZED);
        }
    }
}