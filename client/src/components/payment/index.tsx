import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import { EXECUTE_PAY } from "../../graphql/payment";
import { graphqlFetcher } from "../../queryClient";
import { CheckedCartState } from "../../recoils/cart"
import { ShopisLoading } from "../../recoils/layout";
import PaymentModal from "./modal";
import OrderList from "./orderlist";


const Payment = ()=>{
    const navigate = useNavigate();
    const [isLoadingSite,setIsLoading] = useRecoilState(ShopisLoading);
    const [checkedCartState,setCheckedCartState] = useRecoilState(CheckedCartState);
    const [modalShown, toggleModal] = useState(false);
    const {mutate:executePay,isLoading} = useMutation((ids)=>graphqlFetcher(EXECUTE_PAY, ids))
    const showModal = () =>{
        toggleModal(true)
    }
    const proceed = ()=> {
        const ids = checkedCartState.map(({id})=>(id));
        setCheckedCartState([]);
        executePay({ids},{
            onSuccess:()=>{
                alert("결제완료되었습니다!");
                navigate('/products',{replace:true});
            }
        });
    }
    const cancel = ()=>{
        toggleModal(false);
    }
    useEffect(()=>{
        if(isLoading){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    },[isLoading])
    return  (
        <div>
            <OrderList handleSubmit={showModal}/>
            <PaymentModal show={modalShown} proceed={proceed} cancel={cancel}/>
        </div>
    )
}
export default Payment