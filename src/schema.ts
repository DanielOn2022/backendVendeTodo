import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import * as types from './infrastructure/types';
import {queries} from './infrastructure/Queries';
import { mutations } from './infrastructure/Mutations';


export const schema = makeSchema({
  types: [types, queries, mutations],
  plugins: [
    declarativeWrappingPlugin(),
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