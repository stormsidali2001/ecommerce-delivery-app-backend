import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { AdminRegistrationDto, ClientRegistrationDto, DeliveryManRegistrationDto } from "src/dto/registrationDtos";
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
}