import { DBField } from "../dbController";
import { Resolver } from "./types";

const cartResolver:Resolver = {
    Query : {
        cart:(parent,args,{db})=>{
            return db.cart
        }
    },
    Mutation:{
        /*
        addCart:(parent,{id},{db},info)=>{
            if(db.cart[id]){
                const cartData = db.cart[id];
                if(cartData){
                    cartData.amount = cartData.amount + 1;
                }
                return cartData;
            }else{
                const found = db.products.find((element:any) => (element.id === id));
                if(found){
                    let newCart = {...found, amount:1};
                    if(newCart !== null) db.cart[id] = newCart;
                }

                return {...found, amount:1};
            }
        },
        updateCart:(parent,{id,amount},{db},info)=>{
            if(id && amount && db.cart[id]){
                const cartData = db.cart[id];
                if(cartData){
                    cartData.amount = amount;
                }
                return {...cartData, isDone:true};
            }else{
                return {isDone:false};
            }
        },
        deleteCart:(parent,{id},{db},info)=>{
            if(db.cart[id]){
                delete db.cart[id];
                return {isDone:true}
            }else{
                return {isDone:false}
            }

        },
        executePay:(parent,{ids},{db},info)=>{
            const newCartData = db.cart.filter((cartItem:any) =>
                (!ids.includes(cartItem.id)) 
            )
            db.cart = newCartData;
            return ids;
        }*/
    },
    CartItem:{
        product:(cartItem, args, {db})=>db.products.find((product:any) => product.id === cartItem.id)
    }
}

export default cartResolver;