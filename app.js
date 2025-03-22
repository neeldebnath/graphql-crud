const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { Sequelize } = require('sequelize');
const User = require('./model/user');
const schema = require('./graphql/schema');

// Initialize express app
const app = express();

// Set up the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // GraphiQL UI for testing GraphQL queries
  })
);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});

// Sync Sequelize models
User.sync().then(() => {
  console.log('Database synchronized!');
});
