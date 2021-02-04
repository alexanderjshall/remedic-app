import { GraphQLClient } from 'graphql-request';

const client: GraphQLClient = new GraphQLClient((process.env.REACT_APP_BE_URL || 'http://localhost:4000/graphql'));

export default client;