import { gql } from 'apollo-server-express'

const productSchema = gql`
    type Product {
        id:ID!,
        imageUrl:String!,
        price:Int!,
        title:String!,
        description:String,
        createdAt:Float #13자리이상
    }
    extend type Query{
        products:[Product!] #파일구조
        product(id: ID!): Product! #리드!
    }
`
export default productSchema;