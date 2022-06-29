import { Cart } from "../../types";

const ItemData = ({title, imageUrl, price}:Pick<Cart, 'imageUrl' | 'price' | 'title'> ) =>{
    return (
        <div>
            <p  className="product-item__title">{title}</p>
            <p><img  className="product-item__image" src={imageUrl}/></p>
            <p><span  className="product-item__price">${price}</span></p>
        </div>
    )
}
export default ItemData;