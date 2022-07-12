import { ProductCustom } from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { ADD_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import splitPrice from "../../utill/splitPrice";

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
   const {mutate:addCart} = useMutation(()=>graphqlFetcher(ADD_CART,{id}))
    const AddCartAmount = () =>{addCart()} //setCartAmount((cartAmount|0)+1)
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


