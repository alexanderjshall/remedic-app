import { GraphQLClient } from 'graphql-request';


const client: GraphQLClient = new GraphQLClient(process.env.REACT_APP_BE_URL as string);

export default client;
