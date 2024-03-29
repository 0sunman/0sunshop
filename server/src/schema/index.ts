import {gql}from 'apollo-server-express';
import productSchema from './product';
import cartSchema from './cart';
import userSchema from './user';
import contentSchema from './content';
import cdRelationSchema from './cdtable';
import documentSchema from './document';
import detailImageSchema from './detailImage'
import projectSchema from './project'

const linkSchema = gql `
    type Query{
        _:Boolean
    }
    type Mutation{
        _:Boolean
    }
`

export default [linkSchema, productSchema, cartSchema,userSchema, contentSchema,cdRelationSchema, documentSchema, detailImageSchema, projectSchema]