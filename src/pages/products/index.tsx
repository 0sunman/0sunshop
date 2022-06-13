import { useQuery } from "react-query";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";
import ProductItem from "../components/product/ProductItem";
/*
category    : "men's clothing"
description : "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id          : 1
image       : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price       : 109.95
rating      : {rate: 3.9, count: 120}
title       : "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
*/


const ProductList = ()=> {
    const {data} = useQuery<Product[]>(QueryKeys.PRODUCTS, ()=> fetcher({
        method:'GET',
        path:'/products'
    }))
    return (
        <div>
            <h2> 상품리스트 </h2>
            <ul>
            {data?.map((attr)=>{
                console.log(attr);
                return (
                    <ProductItem {...attr}></ProductItem>
                )})}
            </ul>
        </div>
    )
}

export default ProductList;