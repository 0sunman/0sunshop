import { Product, Products, Resolver } from "./types";
import {v4 as uuid} from 'uuid';
import { DBField, writeDB } from "../dbController";
import {collection, DocumentData, getDoc, getDocs, limit, orderBy, query, startAfter, where, doc, serverTimestamp, addDoc, updateDoc, snapshotEqual} from 'firebase/firestore';
import {db} from '../firebase'


const setJSON = (data:Products) => writeDB(DBField.PRODUCTS, data);
const PAGE_SIZE = 15;
const productResolver:Resolver = {
    Query: {
        products: async (parent, {cursor='', showDeleted=false}) => {

            const products = await collection(db,'products');
            const queryOptions = [
                orderBy('createdAt','desc')
            ]
            if(cursor){
                const snapshot = await getDoc(doc(db,'products',cursor));
                queryOptions.push(startAfter(snapshot))
            }
            if(!showDeleted) queryOptions.unshift(
                where('createdAt','!=',null)
            );
            const q = query(
                products,
                ...queryOptions,
                limit(PAGE_SIZE)
            )
            
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        },
        product: async (parent, { id }) => {
            const snapshot = await getDoc(doc(db,'products',id));
            return {
                ...snapshot.data(),
                id:snapshot.id
            }
        }
    },
    Mutation: {
        addProduct: async (parent,{
            imageUrl,
            price,
            title,
            description
        })=>{
            const newProduct = {
                imageUrl,
                price,
                title,
                description,
                createdAt:serverTimestamp(),
            }
            const result = await addDoc(collection(db,'products'), newProduct);
            const snapshot = await getDoc(result);
            return {
                ...snapshot.data(),
                id:snapshot.id
            }
        },
        updateProduct:async (parent, {id,...data})=>{
            const productRef = doc(db,'products',id);
            if(!productRef) throw new Error('없는 상품입니다.')
            await updateDoc(productRef,{
                ...data,
                createdAt:serverTimestamp()
            });
            const snapshot = await getDoc(productRef);
            return {
                ...snapshot.data(),
                id:snapshot.id
            }
        },
        deleteProduct:async (parent, {id})=>{
            const productRef = doc(db,'products',id);
            if(!productRef) throw new Error('없는 상품입니다.')
            await updateDoc(productRef,{createdAt:null});
            return id
        },
    }
}


export default productResolver;