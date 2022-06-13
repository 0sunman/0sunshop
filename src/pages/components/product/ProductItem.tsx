import { Product } from "../../../types";

const ProductItem = ({
    category,
    description,
    id,
    image,
    price,
    rating,
    title
}:Product)=>{
    console.log("PRODUCT, ",category)
    return (<li>
                <p>{category}</p>
                <p>{description}</p>
                <p>{id}</p>
                <img src={image}/>
                <span>${price}</span>
                <p>{rating.count}</p>
                <p>{title}</p>
            </li>)
    }

export default ProductItem