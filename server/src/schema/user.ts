import { gql } from 'apollo-server-express'

const userSchema = gql`
    type User{
        userid:String!
        password:String!
        token:String
    }
    type UserLogut{
        userid:String!
        isDone:Boolean!
    }
    type UserConfirm{
        userid:String!
        isLogin:Boolean!
    }
    extend type Query{
        users(userid:String):[User!]
        user(userid:String!,password:String!):User
    }
    extend type Mutation{
        isLogin(userid:String!, token:String!):UserConfirm
        loginUser(userid:String!, password:String!):User
        logoutUser(userid:String!):UserLogut
        addUser(userid:String!, password:String!):User
        updateUser(userid:String!, password:String!):User
        deleteUser(userid:String!, password:String!):User
    }
`
export default userSchema;