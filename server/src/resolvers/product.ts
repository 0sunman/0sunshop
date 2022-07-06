import { Resolver } from "./types";

const productResolver:Resolver = {
    Query: {
        products: (parent, args, {db}, info) => {
            return db.products;
        },
        product: (parent, { id }, {db}, info) => {
            const found = db.products.find((item:any) => item.id === id);
            return (found !== undefined) ? found : null;
        }
    },
    Mutation: {}
}


export default productResolver;