import { ProductCustom } from "../../types";
import { Link } from "react-router-dom";

const ProductItem = ({
    description,
    id,
    imageUrl,
    price,
    title
}:ProductCustom)=>{
    return (<li className="product-item">
                <Link to={`/products/${id}`}>
                    <p  className="product-item__title">{title}</p>
                    <p><img  className="product-item__image" src={imageUrl}/></p>
                    <p><span  className="product-item__price">${price}</span></p>
                </Link>
            </li>)
    }

export default ProductItem


