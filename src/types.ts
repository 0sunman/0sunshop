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

export interface ProductCustoms{
    products:ProductCustom[]
}