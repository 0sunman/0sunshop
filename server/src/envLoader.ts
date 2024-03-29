import { resolve } from "path";
import * as dotenv from 'dotenv';

if(!process.env.NODE_ENV) throw new Error("need NODE_ENV");
dotenv.config({path:resolve(resolve(), `.env.${process.env.NODE_ENV}`)})
console.log(resolve(), `.env.${process.env.NODE_ENV}`)

export default process.env