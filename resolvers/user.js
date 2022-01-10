const { users, tasks } = require("../constants");

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((users) => users.id === id),
  },
  Mutation: {},
  User: {
    tasks: ({ id }) => tasks.filter((task) => task.userId === id),
  },
};
