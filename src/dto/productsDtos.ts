import { Type } from "class-transformer";

export class ProductDto{
    name:string;
    description:string;
    @Type(()=>Number)
    quantity:number;
    @Type(()=>Number)
    price:number;
    imageUrl:string;
}

export class EditProductDto{
    name?:string;
    description?:string;
    @Type(()=>Number)
    quantity?:number;
    @Type(()=>Number)
    price?:number;
    imageUrl?:string;
}