import { Cart, CartDatas } from "../../types";
import { Query, QueryClient, useMutation, useQuery } from "react-query";
import { ADD_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../../graphql/carts";
import { getQueryClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import React, { ForwardedRef, forwardRef, RefObject, SyntheticEvent, useEffect, useState } from "react";
import ItemData from "./ItemData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import { useRecoilState } from "recoil";
import {CartLength} from "../../recoils/cart";



const CartItem = ({
    id,
   product:{ imageUrl,
    price,
    title,
    createdAt},
    amount,
    dataKey
}:Cart & { dataKey : number }, ref:ForwardedRef<HTMLInputElement>)=>{
    const [cartLength, setCartLength] = useRecoilState(CartLength);
    const client = getQueryClient();
    const {mutate:deleteCart} = useMutation(()=>graphqlFetcher(DELETE_CART,{id}), {
        onMutate:async ()=>{
        },
        onSuccess:()=>{
            client.invalidateQueries("getCart",{
                exact:false,
                refetchInactive:true,
            })
            refetch();
        }
    })
    const {mutate:updateAmount} = useMutation("cartUpdate",({id,amount}:{id:string,amount:number})=>graphqlFetcher(UPDATE_CART,{id,amount}),{
        onMutate:async ({id,amount})=>{

            await client.cancelQueries("getCart");
            const {cart:prevCart} = client.getQueryData<{cart:Cart[]}>("getCart")|| {};
            if(!prevCart) return null;

            const targetIndex = prevCart?.findIndex(cartItem =>cartItem.id === id);
            if(targetIndex === undefined || targetIndex < 0) return prevCart;

            const newCart = [...prevCart];
            newCart.splice(targetIndex,1,{...newCart[targetIndex], amount});
            client.setQueryData("getCart",{cart:newCart});
            return prevCart;
        },
        onSuccess: ({updateCart}) =>{
            const {cart:prevCart} = client.getQueryData<{cart:Cart[]}>("getCart") || {cart:[]};
            const targetIndex = prevCart?.findIndex(cartItem =>cartItem.id === updateCart.id);
            if(!prevCart || targetIndex === undefined || targetIndex < 0) return;

            const newCart = [...prevCart];
            newCart.splice(targetIndex,1,updateCart);
            client.setQueryData("getCart",{cart:newCart});
            
        }
    })
    const {refetch} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART,{userid:window.localStorage.getItem("userid")}),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            console.log(cart);
            setCartLength(cart.length);
        },
        onError:(err)=>{
            debugger;
            console.log(err)
        }
    });

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const amount:number = Number(e.target.value);
        updateAmount({id,amount});        
    }
    const onDelete = (e:SyntheticEvent)=>{
        e.preventDefault();
        deleteCart();
    }
    return (<li className="cart-item">
                    <p className='cart-item__header' data-key={dataKey}>
                        <span className="cart-item__header__title">
                            <input className="cart-item__header__selectitem" type="checkbox" name='selectItem' ref={ref} data-id={id} disabled={!createdAt}/> {title}
                        </span>
                        <button className="cart-item__header__closebutton" onClick={onDelete}><FontAwesomeIcon icon={faXmark} /></button>
                    </p>
                    <ItemData id={id} title={title} imageUrl={imageUrl} price={price}></ItemData>
                    {!createdAt ? <div>삭제된 상품입니다.</div> : <p><input className="product-item__amount" type="number" value={amount} onChange={onChange}></input></p>}
                    <p></p>
            </li>)
    }

export default forwardRef(CartItem)


