import { Cart } from "../../types";
import { useQuery } from "react-query";
import { ADD_CART, GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}:Cart)=>{

    
    return (<li className="product-item">
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p><span  className="product-item__price">{amount}</span></p>
            </li>)
    }

export default CartItem


