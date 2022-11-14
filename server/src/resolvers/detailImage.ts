import {Resolver} from './types'
// import {writeDB, DBField, modifyDB} from './../jsondb'
import { v4 } from 'uuid';

// const setJSON = (data:any) => writeDB(DBField.CONTENTS, data);
// const modifyJSON = (id:string, title:string, path:string, selector:string, data:any) => modifyDB(DBField.CONTENTS, id, title, path,selector, data);
const detailImageResolver:Resolver = {
        Query:{
            detailImages:async (parent,args,{data})=>{
                const result = await data('detailImage').select().orderBy('id', 'desc');
                return result;
            },
        },
        /*
        
        */
        Mutation:{
            addDetailImage:async (parent,{id,src,description},{data},info)=>{
                await data('detailImage').insert({id,src,description});
                const result = await data('detailImage').select();
                console.log(result);
                return result;
            },
            modifyDetailImage:async (parent,{_id,id,src,description},{data},info)=>{
                await data('detailImage').where("_id",id).update({id,src,description})
                const result = await data('detailImage').select();
                return result;
            },
            removeDetailImage:async (parent,{_id},{data},info)=>{
                await data('detailImage').where("_id",_id).del();
                const result = await data('detailImage').select();
                return result;
            }
        }
}
export default detailImageResolver