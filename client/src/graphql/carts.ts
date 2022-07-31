import { gql } from "graphql-tag";

export const GET_USER_CART = gql`
    mutation GetUserCart($userid: String!) {
    getUserCart(userid: $userid) {
        id
        amount
        product {
        id
        imageUrl
        title
        price
        description
        }
    }
    }
`

export const GET_CART = gql`
    query GET_CART($userid:String!){
        cart(userid:$userid){
                id
                amount
                product{
                    id
                    imageUrl
                    price
                    title
                    description
                    createdAt
                }
                userid

        }

    }
`

export const ADD_CART = gql`
    mutation ADD_CART($id:ID!, $userid:String!){
        addCart(id:$id, userid:$userid){
            id
            amount
            product{
                id
                imageUrl
                price
                title
                description
                createdAt
            }
            userid
        }

    }
`

export const DELETE_CART = gql`
    mutation DELETE_CART($id:ID!){
        deleteCart(id:$id)
    }
`

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id:ID!, $amount:Int!){
        updateCart(id:$id, amount:$amount){
                    id
                    amount 
                    product{
                        id
                        imageUrl
                        price
                        title
                        description
                        createdAt
                    }
        }
    }
`