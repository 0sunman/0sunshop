import { SyntheticEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CheckedCartState } from "../../recoils/cart";
import ItemData from "../cart/ItemData";
import styled from 'styled-components';
import splitPrice from '../../utill/splitPrice';
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
    useEffect(()=>{

    })
    return (
        <div className="willPay">
            <div className="willPay__products">
            {checkedItems.map(({product:{imageUrl, price, title, createdAt},id,amount})=>{
                
                return (
            <div >
                <ItemData imageUrl={imageUrl} price={price} title={title} key={id}/>
                <p style={{marginTop:"10px"}}>수량 : {amount}</p>
                <p style={{marginTop:"5px"}}>가격 : {splitPrice(price * amount)}원</p>
                {!createdAt && "삭제된 상품입니다."}
            </div>)})}

            </div>
            <div className="willPay__control">
                <div>총 예상 결제액 : {splitPrice(totalPrice)} 원</div>
                <div><button onClick={handleSubmit}>결제하기</button></div>                
            </div>
        </div>
    )
}
export default WillPay;