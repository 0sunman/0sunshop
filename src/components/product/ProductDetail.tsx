import { ProductCustoms, ProductCustom } from "../../types";
import { Link } from "react-router-dom";

const ProductDetailPage = ({
    description,
    id,
    imageUrl,
    price,
    title
}:ProductCustom)=>{
    return (<div className="product-item">
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p className="product-item__description">{description}</p>
            </div>)
    }

export default ProductDetailPage