import { SyntheticEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CheckedCartState } from "../../recoils/cart";
import ItemData from "../cart/ItemData";
import styled from 'styled-components';
const WillPay = ({
    handleSubmit
}:{
    handleSubmit:(e:SyntheticEvent) => void;
})=>{
    const navigate = useNavigate();
    const checkedItems = useRecoilValue(CheckedCartState);
    const totalPrice = checkedItems.reduce((res,{product:{price,createdAt},amount})=>{
            if(createdAt) res += (price * amount);
        return res;    
    },0);
    return (
        <div>
            {checkedItems.map(({product:{imageUrl, price, title, createdAt},id,amount})=>{
                
                return (
            <div>
                <ItemData imageUrl={imageUrl} price={price} title={title} key={id}/>
                <p>수량 : {amount}</p>
                <p>가격 : {price * amount}</p>
                {!createdAt && "삭제된 상품입니다."}
            </div>)})}
            <p>총 예상 결제액 : {totalPrice}</p>
            <button onClick={handleSubmit}>결제하기</button>
        </div>
    )
}
export default WillPay;