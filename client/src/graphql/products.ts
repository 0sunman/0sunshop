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
    query GET_PRODUCTS{
        id
        imageUrl
        price
        title
        description
        createdAt
    }
`


export const GET_PRODUCT = gql`
    query GET_PRODUCT($id:string){
        id
        imageUrl
        price
        title
        description
        createdAt
    }
`
