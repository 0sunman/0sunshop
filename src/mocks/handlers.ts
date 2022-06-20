import {graphql, rest} from 'msw';
import { QueryKeys } from '../queryClient';
import { v4 as uuid } from 'uuid';
import { Cart } from '../types';


const mock_products = (() => Array.from({length:20}).map((_, i)=>({
    id: (i)+"",
    imageUrl:`https://placeimg.com/150/100/${i+1}`,
    price:50000,
    title:`임시상품${i+1}`,
    description:`임시상세내용${i+1}`,
    createdAt:new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString()
})))()

const mock_carts:Cart[] = {};

export const handlers = [
    graphql.query("GET_PRODUCTS", (req,res,ctx)=>{
        return res(
            ctx.data({
                products:mock_products,
            })
        )
    }),

    graphql.query("GET_PRODUCT",(req,res,ctx)=>{
        const found = mock_products.find(item => item.id === req.variables.id); 
        
        return res(
            (found !== undefined)?
                ctx.data(found)
            :
                ctx.data({error:null})
            
        )
    }),

    graphql.query("GET_CART", (req,res,ctx)=>{
        return res(ctx.data(mock_carts));
    }),
    graphql.mutation("ADD_CART",(req,res,ctx)=>{
        const id:any = String(req.variables.id);
        if(mock_carts[id]){
            const cartData = mock_carts[id];
            if(cartData){
                cartData.amount = cartData.amount + 1;
            }
            return res(ctx.data({...cartData}));
        }else{
            const found = mock_products.find(element => (element.id === id));
            if(found){
                let newCart:Cart = {...found, amount:1};
                if(newCart !== null) mock_carts[id] = newCart;
            }

            return res(ctx.data({...found, amount:1}));
        }
    }),
    
    graphql.mutation("UPDATE_CART",(req,res,ctx)=>{
        const id:any = String(req.variables.id);
        const amount = req.variables.amount;
        if(id && amount && mock_carts[id]){
            const cartData = mock_carts[id];
            if(cartData){
                cartData.amount = amount;
            }
            return res(ctx.data({...cartData, isDone:true}));
        }else{
            return res(ctx.data({isDone:false}));
        }
    }),
    graphql.mutation("DELETE_CART",(req,res,ctx)=>{
        const id:any = String(req.variables.id);
        if(mock_carts[id]){
            delete mock_carts[id];
            return res(ctx.data({isDone:true}))
        }else{
            return res(ctx.data({isDone:false}))
        }
    })
]

/*
    msw (핸들러 / 그래프ql / 브라우저 tx)
    1. 핸들러를 만듦. (handler.ts)
        graphql.query(key, server(res로 보냄))
    2. graphql를 짬. (products.ts)
        query 이름{ 속성들.. }
    3. mock_products 함수를 만들어서 map으로 돌림.
    4. browsers.ts를 만듬 (홈페이지 참고)
    5. index.js에서 부름
*/