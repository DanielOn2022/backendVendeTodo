import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import createExpress from 'express';
import logger from './infrastructure/Logger';
import { schema } from './schema';
import { context } from './context';

const port = 5000;

async function startApolloServer() {
  const apollo = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context
  });
  
  await apollo.start()
  const express = createExpress();
  
  apollo.applyMiddleware({ app: express });
  
  express.listen(port, () => {
    logger.log({
      level: 'info',
      message: `🚀 GraphQL service ready at http://localhost:${port}/graphql`
    });
  });
}

startApolloServer();