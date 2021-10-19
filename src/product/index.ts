import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

const products: { [k: string]: { id: string, name: string } } = {
  p1: {
    id: 'p1',
    name: 'P1'
  },
  p2: {
    id: 'p2',
    name: 'P2'
  },
  p3: {
    id: 'p3',
    name: 'P3'
  },
  p4: {
    id: 'p4',
    name: 'P4'
  },
};

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
  }

  type Query {
    getProduct(id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    getProduct(id: string) {
      const product = products[id];
      return product;
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server
  .listen(4002)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
