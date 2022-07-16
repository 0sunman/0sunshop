import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema';
import resolvers from './resolvers';
import { DBField, readDB } from './dbController';
import env from './envLoader';

//{typeDefs, resolvers}
(async()=>{
    const clientUrl = env.CLIENT_URL as string;
    const port = env.PORT || 8000
    const server = new ApolloServer({
        typeDefs:schema,
        resolvers,
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
            origin:["*",clientUrl,"http://localhost:3000","http://localhost:8000","http://localhost:8000/graphql", 'https://studio.apollographql.com'],
            credentials:true
        }
    })
    await app.listen({port});

    console.log(`server listening on ${port}`)
})()
