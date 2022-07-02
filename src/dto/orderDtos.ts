import { Type } from "class-transformer";

 export class OrderUnit{
    @Type(()=>Number)
    productId:number;
    @Type(()=>Number)
    quantity:number;
}
export class OrderDto{
   @Type(()=>OrderUnit)
    cart:OrderUnit[];
}