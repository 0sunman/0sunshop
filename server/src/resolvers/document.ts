import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
/*
type Document {
        id:Int!,
        author:String,
        content:String,
        title:String,
        imgUrl:String
        selector:String,
        createdAt:String,
    }

extend type Query{
        documents:[Document]
        document(id:Int!): [Document]
        documentlike(title:String!): [Document]
    }
    extend type Mutation{
        addDocument(
            author:String,
            content:String,
            title:String,
            imgUrl:String
            selector:String
            ):[Document]
        modifyDocument(
            author:String,
            content:String,
            title:String,
            imgUrl:String
            selector:String
            ):[Document]
        removeDocument(id:Int!):[Document]
    }

*/

const documentResolver:Resolver = {
        Query:{
            documents:async (parent,args,{data})=>{
                const result = await data('documents').select();
                return result;
            },
            document:async (parent,{id},{data})=>{
                const result = await data('documents').select().where("id",id);
                return result;
            },
            documentslike:async (parent,{title},{data})=>{
                const result = await data('documents').select().where("title","like",`%${title}%`);
                return result;
            }
        },
        Mutation:{
            addDocument:async (parent,{author, content, title, imgUrl, selector, path},{data},info)=>{
                await data('documents').insert({author, content, title, imgUrl, selector, path});
                const result = await data('documents').select().limit(1).orderBy('id', 'desc');
                console.log(result);
                return Number(result[0].id);
            },
            modifyDocument:async (parent,{id, author, content, title, imgUrl, selector, path},{data},info)=>{
                await data('documents').where("id",id).update({author, content, title, imgUrl, selector, path})
                const result = await data('documents').select();
                return result;
            },
            removeDocument:async (parent,{id},{data},info)=>{
                await data('documents').where("id",id).del();
                const result = await data('documents').select();
                return result;
            }
        }
}
export default documentResolver