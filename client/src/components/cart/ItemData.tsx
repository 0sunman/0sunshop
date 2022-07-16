import { Cart } from "../../types";
import splitPrice from "../../utill/splitPrice";

const ItemData = ({title, imageUrl, price}:Pick<Cart, 'imageUrl' | 'price' | 'title'> ) =>{
    return (
        <div>
            <p><img  className="product-item__image" src={imageUrl}/></p>
            <p><span  className="product-item__price">{splitPrice(price)}</span> 원</p>
        </div>
    )
}
export default ItemData;