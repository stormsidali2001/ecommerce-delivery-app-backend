import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { ClientRegistrationDto } from "src/dto/registrationDtos";
import { AuthService } from "./auth.service";


@Controller('')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}
    
    @Public()
    @Post('signup/client')
    async signUpClient(@Body() client:ClientRegistrationDto){
        return this.authService.signUpClient(client);
    }
}