import { Cart } from "../../types";
import { Query, useMutation, useQuery } from "react-query";
import { ADD_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../../graphql/carts";
import { getQueryClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import React, { ForwardedRef, forwardRef, RefObject, SyntheticEvent, useEffect, useState } from "react";
import ItemData from "./ItemData";




const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount,
    dataKey
}:Cart, ref:ForwardedRef<HTMLInputElement>)=>{
    const client = getQueryClient();
    const {mutate:deleteCart} = useMutation(()=>graphqlFetcher(DELETE_CART,{id}), {
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
            return {previousCart}
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
    const onDelete = (e:SyntheticEvent)=>{
        e.preventDefault();
        deleteCart(id);
    }
    return (<li className="product-item">
                    <p data-key={dataKey}><input type="checkbox" className='product-item__selectitem' name='selectItem' ref={ref} data-id={id}></input></p>
                    <ItemData id={id} title={title} imageUrl={imageUrl} price={price}></ItemData>
                    <p><input className="product-item__amount" type="number" value={amount} onChange={onChange}></input></p>
                    <p><button onClick={onDelete}>삭제2</button></p>
            </li>)
    }

export default forwardRef(CartItem)


