import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'
import { v4 } from 'uuid';

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
const contentResolver:Resolver = {
        Query:{
            contents:async (parent,args,{data})=>{
//                await data("componenttool").where("selector",null).del()
                await data.schema.table("componenttool", (table:any) =>{
                    table.string('imgUrl',300)
                })
                const result = await data('componenttool').select();
                return result;
            },
            content:async (parent,{id},{data})=>{
                const result = await data('componenttool').select().where("id",id);
                return result;
            }
        },
        Mutation:{
            addContent:async (parent,{title,path,selector,content},{data},info)=>{
                // db.contents.push({id:v4(),title,path,selector,content});
                // setJSON(db.contents);
                // return db.contents;
                await data('componenttool').insert({id:v4(),title,path,selector,content});
                const result = await data('componenttool').select();
                console.log(result);
                return result;
            },
            modifyContent:async (parent,{id,title,path,selector,content},{data},info)=>{
                // //console.log(id,title,path,selector,content)
                // modifyJSON(id,title,path,selector,content)
                // return db.contents;
                await data('componenttool').where("id",id).update({title,path,selector,content})
                const result = await data('componenttool').select();
                return result;
            },
            removeContent:async (parent,{id},{data},info)=>{
                // db.contents = db.contents.filter((content:any) => content.id !== id);
                // setJSON(db.contents);
                // return db.contents;
                
                await data('componenttool').where("id",id).del();
                const result = await data('componenttool').select();
                return result;
            }
        }
}
export default contentResolver