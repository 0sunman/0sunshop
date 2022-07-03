import { Resolver } from "./types";

let cartDatas = [{id:"1", amount:1},{id:"2", amount:2}];
const mock_products = (() => Array.from({length:20}).map((_, i)=>({
    id: (i)+"",
    imageUrl:`https://picsum.photos/id/${i+10}/150/100`,
    price:50000,
    title:`임시상품${i+1}`,
    description:`임시상세내용${i+1}`,
    createdAt:new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString()
})))()

const cartResolver:Resolver = {
    Query : {
        cart:(parent,args,context,info)=>{
            return cartDatas
        }
    },
    Mutation:{
        addCart:(parent,{id},context,info)=>{
            if(cartDatas[id]){
                const cartData = cartDatas[id];
                if(cartData){
                    cartData.amount = cartData.amount + 1;
                }
                return cartData;
            }else{
                const found = mock_products.find(element => (element.id === id));
                if(found){
                    let newCart = {...found, amount:1};
                    if(newCart !== null) cartDatas[id] = newCart;
                }

                return {...found, amount:1};
            }
        },
        updateCart:(parent,{id,amount},context,info)=>{
            if(id && amount && cartDatas[id]){
                const cartData = cartDatas[id];
                if(cartData){
                    cartData.amount = amount;
                }
                return {...cartData, isDone:true};
            }else{
                return {isDone:false};
            }
        },
        deleteCart:(parent,{id},context,info)=>{
            if(cartDatas[id]){
                delete cartDatas[id];
                return {isDone:true}
            }else{
                return {isDone:false}
            }

        },
        executePay:(parent,{ids},context,info)=>{
            const newCartData = cartDatas.filter(cartItem =>
                (!ids.includes(cartItem.id)) 
            )
            cartDatas = newCartData;
            return ids;
        }
    }
}

export default cartResolver;