import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
/*
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

*/

const cdRelationResolver:Resolver = {
        Query:{
            relations:async (parent,args,{data})=>{
                const result = await data('cdtable').select();
                return result;
            },
            relation:async (parent,{id},{data})=>{
                const result = await data('cdtable').select().where("id",id);
                return result;
            }
        },
        Mutation:{
            addRelation:async (parent,{componentid, documentid},{data},info)=>{
                await data('cdtable').insert({componentid, documentid});
                const result = await data('cdtable').select();
                return result;
            },
            removeRelation:async (parent,{id},{data},info)=>{
                await data('cdtable').where("id",id).del();
                const result = await data('cdtable').select();
                return result;
            }
        }
}
export default cdRelationResolver