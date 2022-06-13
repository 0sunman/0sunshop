import { Product } from "../../types";
import { Link } from "react-router-dom";

const ProductItem = ({
    category,
    description,
    id,
    image,
    price,
    rating,
    title
}:Product)=>{
    return (<li className="product-item">
                <Link to={`/products/${id}`}>
                    <p className="product-item__category">{category}</p>
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={image}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                    <p  className="product-item__rating">{rating.count}</p>
                </Link>
            </li>)
    }

export default ProductItem