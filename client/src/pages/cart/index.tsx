import React, { createRef, SyntheticEvent, useEffect, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import CartItem from "../../components/cart/CartItem";
import { DELETE_CART, GET_CART, GET_USER_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { Cart, CartDatas } from "../../types";
import CartList from "../../components/cart";
import { useRecoilState } from "recoil";
import { CartLength } from "../../recoils/cart";
import { useNavigate } from "react-router-dom";
import { UserLoginState } from "../../recoils/user";
import { ShopisLoading } from "../../recoils/layout";
const CartPage = () => {
    const navigate = useNavigate()
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
    if(!isLogin){
        setIsLoading(false);
        navigate("/login")
    }

    const {data,isLoading,isFetched,isFetching,isSuccess} = useQuery<Cart[]>("getCart",()=>graphqlFetcher(GET_CART,{userid:window.localStorage.getItem("userid")?window.localStorage.getItem("userid"):""}),{staleTime:0, cacheTime:1000,
        onSuccess:({cart})=>{
            console.log(cart);
            console.log(cart.length)
        },
        onError:(err)=>{
            if(err.response.errors[0].message === "NoAuth"){
                console.log("로그인이 필요합니다.");
            }
        }
    });

    const cartItems = (data?.cart || []) as CartDatas
    const [cartLength,setCartLength] = useRecoilState(CartLength);

    useEffect(()=>{
        if(isFetching || isLoading){
            setIsLoading(true);
        }else{
            setIsLoading(false);
        }
    },[isFetching,isLoading])

    useEffect(()=>{
        if(isSuccess){
            setIsLoading(false);
        }
        if(isFetched){
            setIsLoading(false);
        }
    },[isFetched,isSuccess])

    if(cartItems){
        return (<CartList {...cartItems}/>)
    }else{
        return(<div>없음.</div>)
    }

}

export default CartPage;