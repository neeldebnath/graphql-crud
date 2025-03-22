const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const User = require('../model/user');

// Define the UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return User.findByPk(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.findAll();
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.create({
          name: args.name,
          email: args.email,
        });
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.update(
          { name: args.name, email: args.email },
          { where: { id: args.id } }
        ).then(() => User.findByPk(args.id));
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return User.destroy({
          where: { id: args.id },
        }).then(() => null);
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
