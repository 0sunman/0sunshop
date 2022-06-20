import { Cart } from "../../types";
import { Query, useMutation, useQuery } from "react-query";
import { ADD_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../../graphql/carts";
import { getQueryClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import React, { useEffect, useState } from "react";




const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}:Cart)=>{
    const client = getQueryClient();
    const {mutate:deleteCart} = useMutation((id)=>graphqlFetcher(DELETE_CART,{id}), {
        onMutate:async ()=>{
            client.cancelQueries("getCart")
            const previousCart = client.getQueryData<{[key:string]:Cart}>("getCart");
            if(!previousCart?.[id]) return previousCart;
            let cnt = 0;
            
            const temp = [];
            for(let key in previousCart){
                if(previousCart[key].id !== id){
                    temp.push(previousCart[key]);
                }
                cnt++;
            }
            const newCart = {...temp}
            client.setQueryData("getCart",newCart);
            return previousCart;
        },
        onSuccess:()=>{
            const previousCart = client.getQueryData<{[key:string]:Cart}>("getCart");
            if(!previousCart?.[id]){
                let cnt = 0;
                const temp = [];
                for(let key in previousCart){
                    if(previousCart[key].id !== id){
                        temp.push(previousCart[key]);
                    }
                    cnt++;
                }
                const newCart = {...temp}
                client.setQueryData("getCart",newCart);
            }
        }
    })
    const {mutate:updateAmount} = useMutation("cartUpdate",({id,amount}:{id:string,amount:number})=>graphqlFetcher(UPDATE_CART,{id,amount}),{
        onMutate:async ({id,amount})=>{
            console.log("current Data",id,amount)
            client.cancelQueries("getCart")
            const previousCart = client.getQueryData<{[key:string]:Cart}>("getCart");
            if(!previousCart?.[id]) return previousCart;
            const newCart = { ...(previousCart||{}), [id]:{...previousCart[id],amount}}
            client.setQueryData("getCart",newCart);
            return previousCart
        },
        onSuccess: (data,{id,amount}) =>{
            const previousCart = client.getQueryData<{[key:string]:Cart}>("getCart");
            if(!previousCart?.[id]){
                const newCart = { ...(previousCart||{}), [id]:{...previousCart[id],amount}}
                client.setQueriesData("getCart",newCart)
            }
        }
    })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const amount:number = Number(e.target.value);
        updateAmount({id,amount});        
    }
    return (<li className="product-item">
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p><input className="product-item__price" type="number" value={amount} onChange={onChange}></input></p>
                    <p><button onClick={() => deleteCart(id)}>삭제</button></p>
            </li>)
    }

export default CartItem


