import React, { createRef, SyntheticEvent, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import CartItem from "../../components/cart/CartItem";
import { DELETE_CART, GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { Cart, CartDatas } from "../../types";
import CartList from "../../components/cart";
const CartPage = () => {
    const {data} = useQuery<Cart[]>("getCart",()=>graphqlFetcher(GET_CART),{staleTime:0, cacheTime:1000});
    const cartItems = (data?.cart || []) as CartDatas
    if(cartItems){
        return (<CartList {...cartItems}/>)
    }else{
        return(<div>없음.</div>)
    }

}

export default CartPage;