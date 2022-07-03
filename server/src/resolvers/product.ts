import { Resolver } from "./types";

const mock_products = (() => Array.from({length:20}).map((_, i)=>({
    id: (i)+"",
    imageUrl:`https://picsum.photos/id/${i+10}/150/100`,
    price:50000,
    title:`임시상품${i+1}`,
    description:`임시상세내용${i+1}`,
    createdAt:new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString()
})))()

const productResolver:Resolver = {
    Query: {
        products: (parent, args, context, info) => {
            return mock_products;
        },
        product: (parent, { id }, context, info) => {
            const found = mock_products.find(item => item.id === id);
            return (found !== undefined) ? found : null;
        }
    },
    Mutation: {}
}


export default productResolver;