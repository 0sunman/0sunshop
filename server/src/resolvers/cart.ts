import { addDoc, deleteDoc, increment, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { DBField, writeDB } from "../dbController";
import { Cart, Product, Resolver } from "./types";
import { AuthenticationError } from 'apollo-server-express';
const setJSON = (data:Cart) => writeDB(DBField.CART, data);
const cartResolver:Resolver = {
    Query : {
        cart:async (parent,{id,userid})=>{
            if(!userid) throw new AuthenticationError("NoAuth");
            if(userid === "nouser")  throw new AuthenticationError("NoAuth");
            const cart = await collection(db,'cart');
            const snapshot = await getDocs(query(cart, where('userid','==',userid)));
            return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        }
    },
    Mutation:{
        getUserCart:async(parent,{userid})=>{
            if(userid === "nouser") throw new AuthenticationError("NoAuth");

            const cart = await collection(db,'cart');
            const snapshot = await getDocs(query(cart, where('userid','==',userid)));
            return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        },
        addCart:async (parent,{id,userid})=>{
            if(!id) throw Error('상품 ID가 없다!');
            if(userid === "nouser") return [];

            const productRef = doc(db,'products',id);
            const cartCollection = collection(db,'cart');
            const exist = (await getDocs(
                query(cartCollection, where('product','==',productRef), where('userid','==',userid))
            )).docs[0];

            if(exist){
                const result = doc(db,'cart',exist.id);
                await updateDoc(result,{
                    amount: increment(1)
                })
                
            }else{
                await addDoc(cartCollection,{
                    amount:1,
                    product:productRef,
                    userid
                })
            }
            const snapshot = (await getDocs(
                query(cartCollection, where('product','==',productRef), where('userid','==',userid))
            )).docs[0];
            return {
                product:productRef,
                id:snapshot.id,
                amount:snapshot.data().amount,
                userid
            }
        },
        updateCart:async (parent,{id,amount})=>{
            
            if(amount < 1) throw Error('1 이하로 바꿀 수 없다!');
            const cartRef = doc(db,'cart',id);
            if(!cartRef) throw Error('Cart 정보가 없다!');
            await updateDoc(cartRef,{
                amount
            })
                
            const snapshot = await getDoc(cartRef);
            return {
                ...snapshot.data(),
                id:snapshot.id
            }
        },
        deleteCart:async (parent,{id})=>{
            const cartRef = doc(db,'cart',id);
            if(!cartRef) throw Error('장바구니 정보가 없다');
            await deleteDoc(cartRef);
            return id;
        },
        executePay:async (parent,{ids})=>{
            const orders=[]
            const products=[]
            const deleted = []
            for await(const id of ids){
                const cartRef = doc(db,'cart',id);
                const cartSnapshot = await getDoc(cartRef);
                const cartData = cartSnapshot.data();
                const productRef = cartData?.product;
                if(!productRef) throw Error('상품정보가 없다!')

                const product = (await getDoc(productRef)).data() as Product;
                if(!product) throw Error('상품정보가 없다!')
                if(product?.createdAt){
                    products.push(productRef);
                    orders.push({
                        amount:cartData?.amount
                    })
                    await deleteDoc(cartRef);
                    deleted.push(id);
                }else{
                }
            }
            return deleted
             
        }
    },
    CartItem:{
        product: async (cartItem, args)=>{
            const product = await getDoc(cartItem.product);
            //console.log("product:",product)
            
            return {
                ...(product.data()) as any,
                id:product.id
            }
        }
    }
}

export default cartResolver;