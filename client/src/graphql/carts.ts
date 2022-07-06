import { gql } from "graphql-tag";

export const GET_CART = gql`
    query GET_CART{
        cart{
            cartItem{
                id
                imageUrl
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

    }
`

export const ADD_CART = gql`
    mutation ADD_CART($id:string){
        cartItem(id:$id){
            id
            imageUrl
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

export const DELETE_CART = gql`
    mutation DELETE_CART($id:string){
        isDone
    }
`

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id:string, $amount:number){
        cartItem(id:$id, amount:$amount){
            id
            imageUrl
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