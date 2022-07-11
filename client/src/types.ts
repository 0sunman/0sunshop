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
    amount:number,
    product:ProductCustom
}

export interface CartDatas{
    cart:Cart[];
}

export interface ProductCustoms{
    products:ProductCustom[]
}

export type MutableProduct = Omit<ProductCustom, "id"|"createdAt">