import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Cart } from "../../types";
import CartItem from "./CartItem";
import { CheckedCartState } from "../../recoils/cart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import WillPay from "../willPay";
import { useNavigate } from "react-router-dom";

const CartList = (items:Cart[])=>{
    const formRef = useRef<HTMLFormElement>(null);
    const [checkedCart, setCheckedCart] = useRecoilState(CheckedCartState);
    const CheckedCart = useRecoilValue(CheckedCartState);
    const itemDatas = Object.keys(items).map((key:any)=>items[key]);
    const checkboxRefs = itemDatas.map(()=>createRef<HTMLInputElement>()); // 1. 일단 각각 ref를 만들어 선언
    const [formData, setFormData] = useState<FormData>(); 
    const navigate = useNavigate();
    const setAllChecked = ()=>{

        if(!formRef.current) return;
        const formData = new FormData(formRef.current);  // formData를 리뷰함
        const selectedCount = formData.getAll('selectItem').length;
        const allChecked = (selectedCount === checkboxRefs.length);
        formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked = allChecked;
    }
    const setItemsCheckedFromAll = (targetInput: HTMLInputElement)=>{
        const allChecked = targetInput.checked;
        checkboxRefs.forEach((element)=>{ // 3. 그냥 이렇게 쓰면됨. 개편함.
            element.current!.checked = allChecked;
        })
    }
    const onChange = (e?:SyntheticEvent)=>{
        if(!formRef.current) return;
        const inputTarget = e?.target as HTMLInputElement;

        if(inputTarget && inputTarget.classList.contains("select-all")){
            setItemsCheckedFromAll(inputTarget);
        }else{
            setAllChecked();
        }

        const formData = new FormData(formRef.current);  // formData를 리뷰함
        setFormData(formData);
        

    } // 2. ref단 후 forwardRef로 선언해서 값을 받음
    useEffect(()=>{
        checkedCart.forEach((data)=>{
            const $item = checkboxRefs.find(ref => ref.current!.dataset.id === data.id);
            if($item) $item.current!.checked = true;
        })
        setAllChecked();
    },[])
    useEffect(()=>{
        const checkedCheckboxes = checkboxRefs.reduce<Cart[]>((res,ref,i)=>{
            if(ref.current?.checked){
                const itemToArray = Object.keys(items).map(key => ({...items[key]}));
                res.push(itemToArray[Number(i)]);
            }
            return res;
        },[])
        setCheckedCart(checkedCheckboxes);
    },[items,formData])
    const handleSubmit = (e:SyntheticEvent)=>{
        e.preventDefault()
        if(checkedCart.length){
            navigate("/payment")
        }else{
            alert('결제대상이 없습니다.')
        }
    }
    return (<div>
            <form ref={formRef} onChange={onChange}>
            <p><input type="checkbox" className='select-all' name='select-all'></input></p>
            {itemDatas.map((item,idx)=> 
                <CartItem {...item} ref={checkboxRefs[idx]} dataKey={idx} key={idx}/>
            )}
            </form>
            <WillPay handleSubmit={handleSubmit}/>
        </div>)
}
export default CartList;