import { Product, Products, Resolver } from "./types";
import {v4 as uuid} from 'uuid';
import { DBField, writeDB } from "../dbController";


const setJSON = (data:Products) => writeDB(DBField.PRODUCTS, data);

const productResolver:Resolver = {
    Query: {
        products: (parent, {cursor='', showDeleted=false}, {db}, info) => {
            const filteredDB = showDeleted ? db.products : db.products.filter(product => !!product.createdAt)
            const fromIndex = filteredDB.findIndex(product => product.id === cursor) + 1
            return filteredDB.slice(fromIndex, fromIndex+15) || [];
        },
        product: (parent, { id }, {db}, info) => {
            const found = db.products.find((item) => item.id === id);
            return (found !== undefined) ? found : null;
        }
    },
    Mutation: {
        addProduct:(parent,{
            imageUrl,
            price,
            title,
            description
        },{db})=>{
            const newProduct = {
                id:uuid(),
                imageUrl,
                price,
                title,
                description,
                createdAt:Date.now()
            }
            console.log(newProduct)
            db.products.push(newProduct);
            setJSON(db.products);
            return newProduct
        },
        updateProduct:(parent, {id,...data},{db})=>{
            const existProductIndex = db.products.findIndex(item => item.id === id);
            if(existProductIndex < 0){
                throw new Error('없는 상품입니다.')
            }
            db.products.splice(existProductIndex,1,{
                ...db.products[existProductIndex],
                ...data
            })
            setJSON(db.products);
            return db.products[existProductIndex]
        },
        deleteProduct:(parent, {id},{db})=>{
            const existProductIndex = db.products.findIndex(item => item.id === id);
            if(existProductIndex < 0){
                throw new Error('없는 상품입니다.')
            }
            const updateItem={
                ...db.products[existProductIndex],
            }
            delete updateItem.createdAt;
            db.products.splice(existProductIndex,1,updateItem)
            setJSON(db.products);
            return db.products[existProductIndex].id
        },
    }
}


export default productResolver;