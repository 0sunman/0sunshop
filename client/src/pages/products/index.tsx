import { useInfiniteQuery, useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { ProductCustoms,ProductCustom } from "../../types";
import ProductItem from "../../components/product/ProductItem";
import {GET_PRODUCTS} from "../../graphql/products";
import ProductList from "../../components/product/list";
import { useCallback, useEffect, useRef, useState } from "react";
import useIntersection from "../../hooks/useIntersection";
/*
category    : "men's clothing"
description : "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id          : 1
image       : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price       : 109.95
rating      : {rate: 3.9, count: 120}
title       : "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
*/


const ProductListPage = ()=> {
    const fetchMoreRef = useRef<HTMLDivElement>(null)
    const intersecting = useIntersection(fetchMoreRef);

//    const {data} = useQuery<ProductCustoms>(QueryKeys.PRODUCTS, ()=> graphqlFetcher(GET_PRODUCTS))
    const {data, isSuccess, isFetchingNextPage, hasNextPage,fetchNextPage} = useInfiniteQuery<ProductCustoms>(
        [QueryKeys.PRODUCTS,"products"], 
        ({pageParam = ""})=>graphqlFetcher(GET_PRODUCTS,{cursor:pageParam, showDeleted:false}),{
        getNextPageParam:(lastPage, allPage)=>{
            return lastPage.products.at(-1)?.id
        }
    })

    useEffect(()=>{
        if(!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
            fetchNextPage()
    },[intersecting])

    return (
        <div>
            <h2> 상품리스트 </h2>
            <ProductList list={data?.pages || []}/>
            <div ref={fetchMoreRef}></div>
        </div>
    )
}

export default ProductListPage;