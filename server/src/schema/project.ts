import {gql} from 'apollo-server-express'

/*

id integer,
    content text COLLATE pg_catalog."default",
    language character varying(50) COLLATE pg_catalog."default",
    "detailImageId" integer,
    "startDate" date,
    "endDate" date
*/

const projectSchema = gql`
    type Project {
        id:Int!,
        title:String,
        content:String,
        language:String,
        detailImageId:Int,
        startDate:Date,
        endDate:Date
    }
    extend type Query{
        projects:[Project]
        project(id:Int!): [Project]
        projectslike(title:String!): [Project]
        projectslikelanguage(language:String!): [Project]
    }
    extend type Mutation{
        addProject(
            title:String,
            content:String,
            language:String,
            detailImageId:Int,
            startDate:Date,
            endDate:Date
            ):[Project]
        modifyProject(
            id:Int!,
            title:String,
            content:String,
            language:String,
            detailImageId:Int,
            startDate:Date,
            endDate:Date
            ):[Project]
        removeDocument(id:Int!):[Project]
    }
`

export default projectSchema;