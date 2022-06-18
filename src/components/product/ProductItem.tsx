import { ProductCustom } from "../../types";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartAmount } from "../../recoils/cart";
import { useMutation } from "react-query";
import { ADD_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductItem = ({
    description,
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
   const {mutate:addCart} = useMutation(QueryKeys.CARTS,()=>graphqlFetcher(ADD_CART,{id}))
    const AddCartAmount = () => addCart() //setCartAmount((cartAmount|0)+1)
    return (<li className="product-item">
                <Link to={`/products/${id}`}>
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                </Link>
                <p><button onClick={AddCartAmount}> 담기</button></p>
            </li>)
    }

export default ProductItem


