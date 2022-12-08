import { makeSchema, declarativeWrappingPlugin, fieldAuthorizePlugin } from 'nexus';
import * as types from './infrastructure/types';
import {queries} from './infrastructure/Queries';
import { mutations } from './infrastructure/Mutations';
import { InvalidTokenError } from './infrastructure/Errors/InvalidTokenError';
import { AuthError } from './infrastructure/permissions/error';
import { inputs } from './infrastructure/Inputs';


export const schema = makeSchema({
  types: [types, queries, mutations, inputs],
  plugins: [
    declarativeWrappingPlugin(),
    fieldAuthorizePlugin({
      formatError({error, ctx}) {
        if (ctx.isAuthenticatedError) {
          throw new InvalidTokenError('invalid token', {
            component: 'Authorize',
            input: {error: error.message}
          });
        }
        throw new AuthError('Wrong permissions', {
          component: 'Authorize',
          input: {error: error.message}
        });
      }
    })
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  contextType: {                                  
    module: __dirname + '/context.ts',        
    export: "Context",                             
  },
});