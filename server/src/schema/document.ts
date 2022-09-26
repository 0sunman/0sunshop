import {gql} from 'apollo-server-express'

const documentSchema = gql`
    type Document {
        id:Int!,
        author:String,
        content:String,
        title:String,
        imgUrl:String
        selector:String,
        path:String,
        createdAt:String,
    }
    extend type Query{
        documents:[Document]
        document(id:Int!): [Document]
        documentslike(title:String!): [Document]
        documentsauthor(title:String!): [Document]
    }
    extend type Mutation{
        addDocument(
            author:String,
            content:String,
            title:String,
            imgUrl:String,
            selector:String,
            path:String,
            ):[Document]
        modifyDocument(
            author:String,
            content:String,
            title:String,
            imgUrl:String,
            selector:String,
            path:String
            ):[Document]
        removeDocument(id:Int!):[Document]
    }
`

export default documentSchema;