import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

type UserType = { id: string, username: string };

const users: { [k: string]: UserType } = {
  a1: {
    id: 'a1',
    username: '@a1'
  },
  a2: {
    id: 'a2',
    username: '@a2'
  },
  a3: {
    id: 'a3',
    username: '@a3'
  }
};

const fetchUserById = (id: string) => {
  const user = users[id];
  return user;
};

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    username: String!
  }
  type Query {
    me(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    me(parent: any, args: any) {
      console.log('[me]', args);
      return fetchUserById(args.id);
    }
  },
  User: {
    __resolveReference(user: UserType){
      return fetchUserById(user.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server
  .listen(4001)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
