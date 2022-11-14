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
        modifyDetailImage(
            _id:ID,
            id:ID,
            src:String,
            description:String,
        ):DetailImage
        removeDetailImage(_id:ID):ID
    }
`
export default detailImageSchema;