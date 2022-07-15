import { Resolver, Users } from "./types";
import {v4 as uuid} from 'uuid';
import { DBField, writeDB } from "../dbController";


const setJSON = (data:Users) => writeDB(DBField.USER, data);

const userResolver:Resolver = {
    Query:{
       users:(parent,args,{db})=>db.users,
       user:(parent,{id,password},{db})=>db.users.filter(user=>(user.id===id && user.password===password))[0],

    },
    Mutation:{
       addUser:(parent,{id,password},{db})=>{
        db.users = [...db.users, {id,password}];
        setJSON(db.users);
        return {id,password}
       },
       updateUser:(parent,{id,password},{db})=>{
        db.users = db.users.map(user => {
            if(user.id === id){
                user.id = id;
                user.password = password
            }
            return user;
        })
        setJSON(db.users)
        return {id,password}
       },
       deleteUser:(parent,{id,password},{db})=>{
        db.users = db.users.filter(user => user.id !== id)
        setJSON(db.users)
        return {id,password}
       },
    }
}

export default userResolver