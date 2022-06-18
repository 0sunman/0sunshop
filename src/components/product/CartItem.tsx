import { Cart } from "../../types";
import { useMutation, useQuery } from "react-query";
import { ADD_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import React, { useEffect, useState } from "react";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}:Cart)=>{
    const test = (callback:Function) => new Promise((resolve,reject)=>{
        console.log("DONE1");
        resolve(callback);
    })
    /* 화면부 */
    const [amountValue,setAmount] = useState("");
    const onChange =  async (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value:string = e.target.value;
        setAmount(e.target.value);
    }
    /* 데이터부 */
    const {mutate:deleteCart} = useMutation(QueryKeys.CARTS, ()=>graphqlFetcher(DELETE_CART,{id}))
    const updateAmount = useMutation(QueryKeys.CARTS, async ()=>graphqlFetcher(UPDATE_CART,{id,amount:amountValue})).mutate
    useEffect(()=>{
        setAmount(amount+"");
    },[])
    useEffect(()=>{
        updateAmount();
    },[amountValue])
    return (<li className="product-item">
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p><input className="product-item__price" type="number" value={amountValue} onChange={onChange}></input></p>
                    <p><button onClick={() => deleteCart()}>삭제</button></p>
            </li>)
    }

export default CartItem


