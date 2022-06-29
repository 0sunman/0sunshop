import { atom,selector, selectorFamily } from "recoil";
import { Cart } from "../types";

export const Text1 = atom({
    key:"Text1",
    default:""
})

export const TextState1 = selector<string|undefined>({
    key:"TextState1",
    get:({get})=>{
        const TextState = get(Text1);
        return TextState;
    },
    set:({get, set},newValue)=>{
        if(typeof newValue === "string"){
            set(Text1,newValue);                
        }
    }
})

/* new */
export const CheckedCartState = atom<Cart[]>({
    key:"CheckedCartState",
    default:[] as Cart[]
})
/*
export const CartAmount = selectorFamily<number,string>({
    key:"CartAmount",
    get : (id:string) => ({get}) => {
        const cart = get(CartState);
        return cart.get(id);
    },
    set : (id:string) => ({get,set},newValue)=>{
        const cart = get(CartState);
        const newCart = new Map([...cart]);
        newCart.set(id,newValue)
        console.log(newCart)
        set(CartState,newCart);
    }
})
*/