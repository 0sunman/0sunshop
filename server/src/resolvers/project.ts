import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'
import { v4 } from 'uuid';

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
const projectResolver:Resolver = {
        Query:{
            projects:async (parent,args,{data})=>{
                const result = await data('project').select().orderBy('id', 'desc');
                return result;
            },
            project:async (parent,{id},{data})=>{
                const result = await data('project').select().where("id",id);
                return result;
            },
            projectslike:async (parent,{title},{data})=>{
//                await data("project").where("selector",null).del()
                const result = await data('project').select().where("title","like",`%${title}%`).orderBy('id', 'desc');
                return result;
            },
            projectspath:async (parent,{path},{data})=>{
//                await data("project").where("selector",null).del()
                const result = await data('project').select().where("path",path).orderBy('id', 'desc');
                return result;
            }
        },
        Mutation:{
            addProject:async (parent,{title,content,language,detailImageId,startDate,endDate},{data},info)=>{
                await data('project').insert({title,content,language,detailImageId,startDate,endDate});
                const result = await data('project').select();
                console.log(result);
                return result;
            },
            modifyProject:async (parent,{id,title,content,language,detailImageId,startDate,endDate},{data},info)=>{
                await data('project').where("id",id).update({title,content,language,detailImageId,startDate,endDate})
                const result = await data('project').select();
                return result;
            },
            removeProject:async (parent,{id},{data},info)=>{
                await data('project').where("id",id).del();
                const result = await data('project').select();
                return result;
            }
        }
}
export default projectResolver