import { ProductCustoms, ProductCustom, CartDatas } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import splitPrice from "../../utill/splitPrice";
import { useRecoilState } from "recoil";
import { UserLoginState } from "../../recoils/user";
import { useMutation, useQuery } from "react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART, GET_CART } from "../../graphql/carts";
import { ShopisLoading } from "../../recoils/layout";
import { useEffect } from "react";

const ProductDetailPage = ({
    id,
    description,
    imageUrl,
    price,
    title
}:ProductCustom)=>{

    const navigate = useNavigate();
    const userid = window.localStorage.getItem("userid");
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    const [isLogin,setIsLogin] = useRecoilState(UserLoginState);
   

    const {mutate:addCart,isLoading,isSuccess} = useMutation(()=>graphqlFetcher(ADD_CART,{id,userid}),{onSuccess(data, variables, context) {
        refetch();
    },})
 
     const {refetch,isFetching,isFetched} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART,{userid:{userid:window.localStorage.getItem("userid")?window.localStorage.getItem("userid"):""}}),{staleTime:0, cacheTime:0,
         onSuccess:({cart})=>{
         },

     });
 
     const AddCartAmount = () =>{
         if(isLogin){
             addCart();
         }else{
             navigate("/login");
         }
         
     } //setCartAmount((cartAmount|0)+1)

     useEffect(()=>{
        if(isLoading){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }

        if(isFetching){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    },[isLoading,isFetching])
    useEffect(()=>{
        if(isSuccess){
            navigate("/cart")
            setIsLoading(false)
        }
    },[isSuccess])
    return (<div className="product-item-detail">
                    <p><img  className="product-item-detail__image" src={imageUrl}/></p>
                    <p className="product-item-detail__title">{title}</p>
                    <p><span  className="product-item-detail__price">{splitPrice(price)}원</span></p>
                    <p className="product-item-detail__description">{description}</p>
                    <div className="product-item-detail__buyButton">
                        <button onClick={AddCartAmount}>구매하기</button>
                    </div>
            </div>)
    }

export default ProductDetailPage

function setCartLength(length: number) {
    throw new Error("Function not implemented.");
}
