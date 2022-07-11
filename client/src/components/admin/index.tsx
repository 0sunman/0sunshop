import { useInfiniteQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { ProductCustoms } from "../../types";
import {GET_PRODUCTS} from "../../graphql/products";
import ProductList from "../../components/product/list";
import { useEffect, useRef, useState } from "react";
import useIntersection from "../../hooks/useIntersection";
import AdminItem from "../../components/admin/adminItem";
import AddForm from "../../components/admin/addForm";
import AdminList from "./list";
/*
category    : "men's clothing"
description : "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id          : 1
image       : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price       : 109.95
rating      : {rate: 3.9, count: 120}
title       : "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
*/


const Admin = ()=> {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const fetchMoreRef = useRef<HTMLDivElement>(null)
    const intersecting = useIntersection(fetchMoreRef);

//    const {data} = useQuery<ProductCustoms>(QueryKeys.PRODUCTS, ()=> graphqlFetcher(GET_PRODUCTS))
    const {data, isSuccess, isFetchingNextPage, hasNextPage,fetchNextPage} = useInfiniteQuery<ProductCustoms>(
       [QueryKeys.PRODUCTS,"admin"], 
        ({pageParam = ""})=>graphqlFetcher(GET_PRODUCTS,{cursor:pageParam,showDeleted:true}),{
        getNextPageParam:(lastPage, allPage)=>{
            return lastPage.products.at(-1)?.id
        }
    })

    useEffect(()=>{
        if(!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
            fetchNextPage()
    },[intersecting])
    const startEdit = (index:number)=> ()=>setEditingIndex(index)
    const doneEdit = () =>setEditingIndex(null)
    return (
        <div>
            <AddForm/>
            <AdminList list={data?.pages || []} editingIndex={editingIndex} startEdit={startEdit} doneEdit={doneEdit}></AdminList>
            <div ref={fetchMoreRef}></div>
        </div>
    )
}

export default Admin;