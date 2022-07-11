import products from "../../pages/products";
import { ProductCustoms, ProductCustom } from "../../types";
import ProductItem from "./ProductItem";

const ProductList = ({list}:{
    list:{
            products: ProductCustom[]
        }[]
    })=>{
    return (
        <ul className="products">
            {list?.map(page => page.products.map(product => (
                    <ProductItem {...product} key={product.id}></ProductItem>
            )))}
            
        </ul>
        )
}

export default ProductList;