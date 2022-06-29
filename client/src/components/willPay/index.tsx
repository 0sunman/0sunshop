import { SyntheticEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CheckedCartState } from "../../recoils/cart";
import ItemData from "../cart/ItemData";

const WillPay = ({
    handleSubmit
}:{
    handleSubmit:(e:SyntheticEvent) => void;
})=>{
    const navigate = useNavigate();
    const checkedItems = useRecoilValue(CheckedCartState);
    const totalPrice = checkedItems.reduce((res,{amount,price},index)=>{
            res += (price * amount);
        return res;    
    },0);
    return (
        <div>
            {checkedItems.map(({imageUrl, price, title,id,amount})=>{
                
                return (
            <div>
                <ItemData imageUrl={imageUrl} price={price} title={title} key={id}/>
                <p>수량 : {amount}</p>
                <p>가격 : {price * amount}</p>
            </div>)})}
            <p>총 예상 결제액 : {totalPrice}</p>
            <button onClick={handleSubmit}>결제하기</button>
        </div>
    )
}
export default WillPay;