import { useMutation, useQuery } from "react-query";
import CartItem from "../../components/product/CartItem";
import { DELETE_CART, GET_CART } from "../../graphql/carts";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { Cart,CartDatas } from "../../types";

const CartPage = () => {
    const {data} = useQuery<Cart[]>("getCart",()=>graphqlFetcher(GET_CART),{staleTime:0, cacheTime:1000})
    console.log(data);

    if(data){
        return (<div>
            {Object.keys(data).map((key:string)=> 
                <CartItem {...data[key]}/>
            )}
        </div>)
    }else{
        return(<div>없음.</div>)
    }

}

export default CartPage;