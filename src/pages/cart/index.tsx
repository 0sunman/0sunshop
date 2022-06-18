import { useQuery } from "react-query";
import CartItem from "../../components/product/CartItem";
import { GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { Cart,CartDatas } from "../../types";

const CartPage = () => {
    const {data} = useQuery<CartDatas>(QueryKeys.CARTS,()=>graphqlFetcher(GET_CART),{staleTime:0, cacheTime:1000})
    if(data){
        return (<div>
            {data?.carts.map(attr => <CartItem {...attr}/>)}
        </div>)
    }else{
        return(<div>없음.</div>)
    }

}

export default CartPage;