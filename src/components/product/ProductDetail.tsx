import { Product } from "../../types";
import { Link } from "react-router-dom";

const ProductDetailPage = ({
    category,
    description,
    id,
    image,
    price,
    rating,
    title
}:Product)=>{
    return (<div className="product-item">
                    <p className="product-item__category">{category}</p>
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={image}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p className="product-item__description">{description}</p>
                    <p  className="product-item__rating">{rating.count}</p>
            </div>)
    }

export default ProductDetailPage