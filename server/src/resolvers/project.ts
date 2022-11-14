import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'
import { v4 } from 'uuid';
import e from 'express';

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
const projectResolver:Resolver = {
        Query:{
            projects:async (parent,{lastid=-1,limit=1},{data})=>{
                let result;
                if(lastid == -1){
                    result = await data('project').select().orderBy('id', 'desc').limit(limit);

                }else{
                    result = await data('project').select().where("id","<",lastid).orderBy('id', 'desc').limit(limit);
                }
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
            projectslikelanguage:async (parent,{path},{data})=>{
//                await data("project").where("selector",null).del()
                const result = await data('project').select().where("language",path).orderBy('id', 'desc');
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