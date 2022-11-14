import { gql } from 'apollo-server-express'

const detailImageSchema = gql`
    type DetailImage {
        _id:ID,
        id:ID,
        src:String,
        description:String,
    }
    extend type Query{
        detailImages(id: ID!): [DetailImage]
    }
    extend type Mutation{
        addDetailImage(
            id:ID,
            src:String,
            description:String,
        ):DetailImage
        updateDetailImage(
            _id:ID,
            id:ID,
            src:String,
            description:String,
        ):DetailImage
        deleteDetailImage(_id:ID):ID
    }
`
export default detailImageSchema;