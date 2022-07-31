import * as express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import schema from './schema';
import resolvers from './resolvers';
import { DBField, readDB } from './dbController';
import env from './envLoader';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from './firebase';
import { getUser } from './var/users';

//{typeDefs, resolvers}
(async()=>{
    const clientUrl = env.CLIENT_URL as string;
    const port = env.PORT || 8000
    const server = new ApolloServer({
        typeDefs:schema,
        resolvers,
        context:async ({req})=>{
            if (!req.headers.authorization) return ;
//            throw new AuthenticationError("missing token");
            const token = req.headers.authorization.substr(7);
            console.log(getUser(token));
            return {token};
//            if (!user) throw new AuthenticationError("invalid token");
//            return { user };
        }
        /*
        context:{
            db:{
                products:readDB(DBField.PRODUCTS),
                cart:readDB(DBField.CART),
                users:readDB(DBField.USER),
            }
        }*/
    });
    const app = express();
    await server.start();
    console.log(clientUrl)
    server.applyMiddleware({
        app,
        path:'/graphql',
        cors:{
            origin:[clientUrl, 'https://studio.apollographql.com'],
            credentials:true
        }
    })
    await app.listen({port});

    console.log(`server listening on ${port}`)
})()
