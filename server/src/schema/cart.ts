import { gql } from 'apollo-server-express'

const cartSchema = gql`
    type CartItem {
        id:ID!
        amount:Int!
        product:Product!
        userid:String
    }
    extend type Query{
        cart(userid:String!):[CartItem!]
    }
    extend type Mutation{
        getUserCart(userid:String!):[CartItem]
        addCart(id:ID!, userid:String!):CartItem
        updateCart(id: ID!, amount:Int!):CartItem!
        deleteCart(id: ID!):ID!
        executePay(ids:[ID!]):[ID!]
    }
`
export default cartSchema;