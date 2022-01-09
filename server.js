const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");

let build = async () => {
  // setting up enrionment variables
  dotEnv.config();

  const app = express();

  //cors
  app.use(cors());

  // body parser middleware
  app.use(express.json());

  const typeDefs = gql`
    type Query {
      greetings: String
    }
  `;

  const resolvers = {};

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 3000;

  app.use("/", (req, res, next) => {
    res.send({ message: "Hello from Sid!" });
  });

  app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
    console.log(`GraphQL Endpoint: ${apolloServer.graphqlPath}`);
  });
};

build();
