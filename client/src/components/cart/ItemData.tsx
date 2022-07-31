import { Cart, ProductCustom } from "../../types";
import splitPrice from "../../utill/splitPrice";

const ItemData = ({id, title, imageUrl, price}:Pick<ProductCustom, 'id'|'imageUrl' | 'price' | 'title'> ) =>{
    return (
        <div>
            <p><img  className="product-item__image" src={imageUrl}/></p>
            <p style={{marginTop:"10px"}}><span  className="product-item__price">{splitPrice(price)}</span> 원</p>
        </div>
    )
}
export default ItemData;