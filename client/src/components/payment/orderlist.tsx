import { SyntheticEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { CheckedCartState } from "../../recoils/cart";
import ItemData from "../cart/ItemData";
import styled from 'styled-components';
import splitPrice from '../../utill/splitPrice';
import { ShopLayoutScrollY } from "../../recoils/layout";
const OrderList = ({
    handleSubmit
}:{
    handleSubmit:(e:SyntheticEvent) => void;
})=>{
    const navigate = useNavigate();
    const checkedItems = useRecoilValue(CheckedCartState);
    const [scrollY,setScrollY] = useRecoilState(ShopLayoutScrollY);
    const totalPrice = checkedItems.reduce((res,{product:{price,createdAt},amount})=>{
            if(createdAt) res += (price * amount);
        return res;    
    },0);
    useEffect(()=>{

    })
    return (
        <div className="orderList">
            <div className="orderList___record">
                <div>
                    <span>상품명</span>
                    <span>개수</span>
                    <span>가격</span>
                </div>
            {checkedItems.map(({product:{price, title, createdAt},amount})=>{                
                return (
                    <div>
                        <span>{title}</span>
                        <span>{amount}개</span>
                        <span>{splitPrice(price * amount)}원</span>
                        {!createdAt && <p>"삭제된 상품입니다."</p>}
                    </div>
                )})}
            </div>
            <div className="orderControl">
                <div className="orderControl__components">
                    <div>총 예상 결제액 : {splitPrice(totalPrice)}원</div>
                    <div><button onClick={handleSubmit}>결제하기</button></div>                
                </div>
            </div>
        </div>
    )
}
export default OrderList;