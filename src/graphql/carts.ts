import { gql } from "graphql-tag";

export const GET_CART = gql`
    query GET_CART{
        id
        imageUrl
        price
        title
        amount
    }
`

export const ADD_CART = gql`
    mutation ADD_CART($id:string){
        id
        imageUrl
        price
        title
        amount
    }
`