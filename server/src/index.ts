import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema';
import resolvers from './resolvers';
import env from './envLoader';
import { getUser } from './var/users';
import {Knex, knex} from 'knex';

(async()=>{
    const clientUrl = env.CLIENT_URL as string;
    const port = env.PORT || 8000
    
    const app = express();
    const config:Knex.Config = {
        client:'pg',
        connection:env.DATABASE_URL
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
            origin:[clientUrl, "https://shop.0sun.net", "https://hdeptcomponenttool.vercel.app", "https://hdeptcomponenttool.vercel.app/", "https://page.0sun.net", 'https://studio.apollographql.com'],
            credentials:true
        }
    })
    await app.listen({port});

    console.log(`server listening on ${port}`)



})()
