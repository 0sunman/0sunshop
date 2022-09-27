import { Cart, CartDatas, ProductCustom } from "../../types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ADD_CART, GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import splitPrice from "../../utill/splitPrice";
import {CartLength} from "../../recoils/cart";
import { useRecoilState } from "recoil";
import { UserLoginState } from "../../recoils/user";
import { ShopisLoading } from "../../recoils/layout";
import { useEffect } from "react";

const ProductItem = ({
    id,
    imageUrl,
    price,
    title
}:ProductCustom)=>{
    const navigate = useNavigate();
    const userid = window.localStorage.getItem("userid");
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    /*
    const [cartAmount,setCartAmount] = useRecoilState(CartAmount(id));
    const cartAmount = useRecoilValue(CartAmount(id));
    const setCartAmount = useSetRecoilState(CartAmount((id)));
    */
   const [cartLength, setCartLength] = useRecoilState(CartLength);

   const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
   
   const {mutate:addCart,isLoading} = useMutation(()=>graphqlFetcher(ADD_CART,{id,userid}),{onSuccess(data, variables, context) {
    if(isLogin){
        refetch();
    }
   },})

   
    const {refetch,isFetching} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART,{userid:window.localStorage.getItem("userid")?window.localStorage.getItem("userid"):""}),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            setCartLength(cart.length);
        },
        onError:(err)=>{
            if(err.response.errors[0].message === "NoAuth"){
            }
        }
    });

    const AddCartAmount = () =>{
        if(isLogin){
            addCart();
        }else{
            navigate("/login");
        }
        
    } //setCartAmount((cartAmount|0)+1)

    useEffect(()=>{
        if(isLoading || isFetching){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    },[isLoading,isFetching])
    return (<li className="product-item">
                <Link to={`/products/${id}`}>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p className="product-item__title">{title}</p>
                    <p><span  className="product-item__price">{splitPrice(price)}</span> <span className="product-item__won">원</span></p>
                </Link>
                <span className="product-item__underbutton"><button onClick={AddCartAmount}><span className="icon material-symbols-outlined">shopping_cart</span></button></span>
            </li>)
    }

export default ProductItem


