import { gql } from 'apollo-server-express'

const userSchema = gql`
    type User{
        id:String!
        password:String!
    }
    extend type Query{
        users:[User!]
        user(id:String!,password:String!):User
    }
    extend type Mutation{
        addUser(id:String!, password:String!):User
        updateUser(id:String!, password:String!):User
        deleteUser(id:String!, password:String!):User
    }
`
export default userSchema;