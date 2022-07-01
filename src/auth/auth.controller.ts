import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { GetCurrentUser } from "src/common/decorators/get-current-user";
import { Public } from "src/common/decorators/public.decorator";
import { LocalAuthGuard } from "src/common/guards/local-auth-guard";
import { AdminRegistrationDto, ClientRegistrationDto, DeliveryManRegistrationDto, UserSigninDTO } from "src/dto/registrationDtos";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}
    
    @Public()
    @Post('signup/client')
    async signUpClient(@Body() client:ClientRegistrationDto){
        return this.authService.signUpClient(client);
    }

    @Public()
    @Post('signup/deliveryMan')
    async signUpDeliveryMan(@Body() deliveryMan:DeliveryManRegistrationDto){
        return this.authService.signUpDeliveryMan(deliveryMan);
    }

    @Public()
    @Post('signup/admin/saffsa;sfajfsajfsajl;fsfsa;sfkj')
    async signUpAdmin(@Body() admin:AdminRegistrationDto){
        return this.authService.signUpAdmin(admin);
    }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('signin')
    async signin(@Request() req){
        return req.user;
   }
 

    @Get('user')
    async getUser(@GetCurrentUser() user){
        return user;
    }
}