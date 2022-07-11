import {gql} from 'graphql-tag';

export interface PRODUCT{
    id:string,
    imageUrl:string,
    price:number,
    title:string,
    description:string,
    createdAt:string
}

export const GET_PRODUCTS = gql`
    query GET_PRODUCTS($cursor:ID, $showDeleted:Boolean){
        products(cursor:$cursor, showDeleted:$showDeleted){
            id
            imageUrl
            price
            title
            description
            createdAt
        }
    }
`


export const GET_PRODUCT = gql`
    query GET_PRODUCT($id:ID!){
        product(id:$id){
            id
            imageUrl
            price
            title
            description
            createdAt
        }

    }
`

export const ADD_PRODUCT = gql`
    mutation addProduct($imageUrl: String!, $price: Int!, $title: String!,$description:String) {
        addProduct(imageUrl: $imageUrl, price: $price, title: $title,description:$description) {
            imageUrl,
            price,
            title,
            description
        }
    }

`
export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id:ID!, $imageUrl: String!, $price: Int!, $title: String!,$description:String){
        updateProduct(id:$id, imageUrl: $imageUrl, price: $price, title: $title,description:$description){
            id
            imageUrl
            price
            title
            description
        }
    }
`
export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id:ID!){
        deleteProduct(id:$id)
    }
`