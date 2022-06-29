import products from "../../pages/products";
import { ProductCustoms } from "../../types";
import ProductItem from "./ProductItem";

const ProductList = ({list}:{list:ProductCustoms})=>{
    return (
        <ul className="products">
            {list?.map((attr)=>{
                return (
                    <ProductItem {...attr}></ProductItem>
                )
            })}
        </ul>
        )
}

export default ProductList;