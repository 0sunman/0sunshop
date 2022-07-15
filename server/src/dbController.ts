import * as fs from 'fs'
import { resolve } from 'path'
export const enum DBField {
    CART = 'cart',
    PRODUCTS = 'products',
    USER = 'user'
}

const basePath = resolve() // __dirname

const filenames = {
    [DBField.CART]: resolve(basePath, 'src/db/cart.json'),
    [DBField.PRODUCTS]:  resolve(basePath, 'src/db/products.json'),
    [DBField.USER]:  resolve(basePath, 'src/db/users.json'),
}

export const readDB = (target: DBField) =>{
    try{
        return JSON.parse(fs.readFileSync(filenames[target],{flag:'r',encoding:'utf-8'}));
    }catch(error){
        console.log(error)
    }

}

export const writeDB = (target:DBField, data:any) =>{
    try{
        fs.writeFileSync(filenames[target],JSON.stringify(data));
    }catch(error){
        console.log(error)
    }

}