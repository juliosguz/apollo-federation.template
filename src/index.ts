import './user';
import './product';

import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

const gateway = new ApolloGateway({
  supergraphSdl
});

const server = new ApolloServer({
  gateway
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
