import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { ProductCustom } from "../../types";
import ProductDetailPage from "../../components/product/ProductDetail";

import {GET_PRODUCT} from "../../graphql/products";

const ProductDetail = ()=> {
    const {id} = useParams();
    const { data } = useQuery<{product:ProductCustom}>([QueryKeys.PRODUCTS, id], ()=> graphqlFetcher(GET_PRODUCT,{id}))
    // 내부의 속성의 타입 = {attr:TYPE}
    if(!data) return;
    const attr:ProductCustom = data.product;

    return <ProductDetailPage {...attr}></ProductDetailPage>;
}
export default ProductDetail;