import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../types";
import ProductDetailPage from "../../components/product/ProductDetail";

const ProductDetail = ()=> {
    const {id} = useParams();
    const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], ()=> fetcher({
        method:'GET',
        path:`/products/${id}`
    }))
    if(!data) return;
    const attr:Product = data;

    //console.log(data)
    return <ProductDetailPage {...attr}></ProductDetailPage>;
}
export default ProductDetail;