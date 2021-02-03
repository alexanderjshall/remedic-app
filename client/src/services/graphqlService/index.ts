import { GraphQLClient } from 'graphql-request';

const client: GraphQLClient = new GraphQLClient(`http://localhost:4000/graphql`);

export default client;