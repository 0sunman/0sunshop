import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { ProductCustom } from "../../types";
import ProductDetailPage from "../../components/product/ProductDetail";

import {GET_PRODUCT} from "../../graphql/products";
import { ShopisLoading } from "../../recoils/layout";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const ProductDetail = ()=> {
    const {id} = useParams();
    const { data, isFetching } = useQuery<{product:ProductCustom}>([QueryKeys.PRODUCTS, id], ()=> graphqlFetcher(GET_PRODUCT,{id}))
    // 내부의 속성의 타입 = {attr:TYPE}
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    useEffect(()=>{
        if(isFetching){
            setIsLoading(true);
        }else{
            setIsLoading(false);
        }
    },[isFetching])
    if(!data) return;
    const attr:ProductCustom = data.product;

    return <ProductDetailPage {...attr}></ProductDetailPage>;
}
export default ProductDetail;