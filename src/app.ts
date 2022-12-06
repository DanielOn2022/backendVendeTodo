import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import createExpress, { request } from 'express';
import logger from './infrastructure/Logger';
import { schema } from './schema';
import { context } from './context';
import { get } from 'lodash';
import { getContext } from './infrastructure/permissions';
import { InvalidTokenError } from './infrastructure/Errors/InvalidTokenError';

const port = 5000;

async function startApolloServer() {
  const apollo = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: (request) => {
      try {
        const operationName = get(request, 'req.body.operationName');
        if (operationName === 'IntrospectionQuery') return;
        const variables = get(request, 'req.body.variables');
        const query = get(request, 'req.body.query');
        logger.log('info', 'request', {
          header: request.req.headers,
          operationName,
          variables,
          query
        });
        const { jwt, token } = getContext(request.req);
        return {
          headers: request.req.headers,
          jwt, token,
          ...context
        }
      } catch (e) {
        throw new InvalidTokenError('Invalid token', {
          component: 'app',
          input: {error: e.message}
        })
      }
    }
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