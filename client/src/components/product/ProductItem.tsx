import { Cart, CartDatas, ProductCustom } from "../../types";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ADD_CART, GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import splitPrice from "../../utill/splitPrice";
import {CartLength} from "../../recoils/cart";
import { useRecoilState } from "recoil";

const ProductItem = ({
    id,
    imageUrl,
    price,
    title
}:ProductCustom)=>{
    /*
    const [cartAmount,setCartAmount] = useRecoilState(CartAmount(id));
    const cartAmount = useRecoilValue(CartAmount(id));
    const setCartAmount = useSetRecoilState(CartAmount((id)));
    */
   const [cartLength, setCartLength] = useRecoilState(CartLength);
   const {mutate:addCart} = useMutation(()=>graphqlFetcher(ADD_CART,{id}))
   
    const {refetch} = useQuery<CartDatas>("getCart",()=>graphqlFetcher(GET_CART),{staleTime:0, cacheTime:0,
        onSuccess:({cart})=>{
            setCartLength(cart.length);
        }
    });

    const AddCartAmount = () =>{
        refetch();
        addCart()
    } //setCartAmount((cartAmount|0)+1)
    return (<li className="product-item">
                <Link to={`/products/${id}`}>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p className="product-item__title">{title}</p>
                    <p><span  className="product-item__price">{splitPrice(price)}</span> <span className="product-item__won">원</span></p>
                </Link>
                <span className="product-item__underbutton"><button onClick={AddCartAmount}> 담기</button></span>
            </li>)
    }

export default ProductItem


