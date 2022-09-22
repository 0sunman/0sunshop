import {gql} from 'apollo-server-express'

const cdRelationSchema = gql`
    type Relation {
        id:Int!,
        componentid:String,
        documentid:Int
    }
    extend type Query{
        relations:[Relation]
        relation(Relation:Int!): [Relation]
    }
    extend type Mutation{
        addRelation(
            componentid:String,
            documentid:Int
            ):[Relation]
        removeRelation(id:Int!):[Relation]
    }
`

export default cdRelationSchema;