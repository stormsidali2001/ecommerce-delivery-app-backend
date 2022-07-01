export class UserSigninDTO{
    constructor(email,password){
         this.email = email;
         this.password = password;
    }
    email:string;
    password:string;
}

export class ClientRegistrationDto extends UserSigninDTO{
    ssn:string;
    firstName:string;
    lastName:string;
    dob:string;
    phoneNumber:string;
    address:string;
}
export class DeliveryManRegistrationDto extends UserSigninDTO{
    ssn:string;
    firstName:string;
    lastName:string;
    dob:string;
    phoneNumber:string;
    address:string;
}

export class AdminRegistrationDto extends UserSigninDTO{
    firstName:string;
    lastName:string;
}