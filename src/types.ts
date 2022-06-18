export type Rating ={
    rate:number,
    count:number
}


export interface ProductCustom{
    id:string,
    imageUrl:string,
    price:number,
    title:string,
    description:string,
    createdAt:string
}

export interface Cart{
    id:string,
    imageUrl:string,
    price:number,
    title:string,
    createdAt:string,
    amount:number
}

export interface CartDatas{
    carts:Cart[];
}

export interface ProductCustoms{
    products:ProductCustom[]
}