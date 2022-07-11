import { DBField, writeDB } from "../dbController";
import { Cart, Resolver } from "./types";
const setJSON = (data:Cart) => writeDB(DBField.CART, data);
const cartResolver:Resolver = {
    Query : {
        cart:(parent,args,{db})=>{
            return db.cart
        }
    },
    Mutation:{
        addCart:(parent,{id},{db},info)=>{
            if(!id) throw Error('상품 ID가 없다!');
            const targetProduct = db.products.find(item => item.id === id);
            if(!targetProduct) throw Error('상품이 없다!');
            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if(existCartIndex > -1){
                const newCartItem = {
                    id,
                    amount: db.cart[existCartIndex].amount + 1
                }
                db.cart.splice(existCartIndex,1,newCartItem);
                setJSON(db.cart);
                return db.cart;
            }
            const newItem = {
                id, amount: 1
            }
            db.cart.push(newItem)
            setJSON(db.cart);
            return db.cart;
        },
        updateCart:(parent,{id,amount},{db},info)=>{
            
            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if(existCartIndex<0){
                throw new Error ("없다!")
            }
            const newCartItem = {
                id,amount
            }
            db.cart.splice(existCartIndex,1,newCartItem);
            setJSON(db.cart)
            return db.cart[existCartIndex]
        },
        deleteCart:(parent,{id},{db},info)=>{
            const existCartIndex = db.cart.findIndex(item => item.id === id)
            if(existCartIndex<0){
                throw new Error ("없다!")
            }

            db.cart.splice(existCartIndex,1);
            setJSON(db.cart)
            return id

        },
        executePay:(parent,{ids},{db},info)=>{
            const newCartData = db.cart.filter((cartItem:any) =>
                (!ids.includes(cartItem.id)) 
            )
            if(newCartData.some(item=>{
                const product = db.products.find(product=>product.id === item.id)
                return !product?.createdAt
            })) throw Error("삭제된 상품이 추가되어 결재진행 불가")
            db.cart = newCartData;
            setJSON(db.cart)
            return db.cart;
        }
    },
    CartItem:{
        product:(cartItem, args, {db})=>db.products.find((product:any) => product.id === cartItem.id)
    }
}

export default cartResolver;