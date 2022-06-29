import React, { ReactElement, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil"
import { stringify } from "uuid";
import { UPDATE_CART } from "../../graphql/carts";
import { EXECUTE_PAY } from "../../graphql/payment";
import { graphqlFetcher } from "../../queryClient";
import { CheckedCartState } from "../../recoils/cart"
import WillPay from "../willPay";
import PaymentModal from "./modal";

type PayInfos = string[]

const Payment = ()=>{
    const navigate = useNavigate();
    const [checkedCartState,setCheckedCartState] = useRecoilState(CheckedCartState);
    const [modalShown, toggleModal] = useState(false);
    const {mutate:executePay} = useMutation((payInfo:PayInfos)=>graphqlFetcher(EXECUTE_PAY, payInfo))
    const showModal = () =>{
        toggleModal(true)
    }
    const proceed = ()=> {
        const payInfo:PayInfos = checkedCartState.map(({id})=>(id));
        setCheckedCartState([]);
        executePay(payInfo);
        alert("결제완료되었습니다!");
        navigate('/products',{replace:true});
    }
    const cancel = ()=>{
        toggleModal(false);
    }
    return  (
        <div>
            <WillPay handleSubmit={showModal}/>
            <PaymentModal show={modalShown} proceed={proceed} cancel={cancel}/>
        </div>
    )
}
export default Payment