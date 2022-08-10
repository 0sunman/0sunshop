import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema';
import resolvers from './resolvers';
import env from './envLoader';
import { getUser } from './var/users';
import {Knex, knex} from 'knex';
import axios from 'axios';

(async()=>{
    const clientUrl = env.CLIENT_URL as string;
    const port = env.PORT || 8000
    const imageServerURL = env.CLOUDFLARE_IMAGE_SERVER as string;    
    const imageServerToken = env.CLOUDFLARE_IMAGE_TOKEN as string;
    
    const app = express();
    const config:Knex.Config = {
        client:'pg',
        connection:{
            connectionString:env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        }
    }

    const pg = knex(config);
    const server = new ApolloServer({
        typeDefs:schema,
        resolvers,
        context:async ({req})=>{
            const result = {"data":pg}
            if (!req.headers.authorization) return {...result};
            const token = req.headers.authorization.substr(7);
            console.log(getUser(token));
            return {...result, token};
        }
    });


    await server.start();
    console.log(clientUrl)
    server.applyMiddleware({
        app,
        path:'/graphql',
        cors:{
            origin:[clientUrl, "https://shop.0sun.net","http://localhost:3000","http://localhost","https://localhost:3000","https://localhost","https://10.108.70.52:3000/","https://10.108.70.52","https://10.108.70.52:3000/","https://10.108.70.52" ,"https://the.0sun.net","https://ts.0sun.net","https://hcomponent.vercel.app","https://hdeptcomponenttool.vercel.app", "https://hdeptcomponenttool.vercel.app/", "https://page.0sun.net", 'https://studio.apollographql.com'],
            credentials:true
        }
    })
    await app.listen({port});

    console.log(`server listening on ${port}`)
    app.get("/uploadImage",async (req,res)=>{
        console.log("Image Upload");
        const imageResponse = await axios(imageServerURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${imageServerToken}`
            }
        });
        const {data:{result:{uploadURL}}} = imageResponse;

        res.json({ok:true,uploadURL});
        
    })


})()
