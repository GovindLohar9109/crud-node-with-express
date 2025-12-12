const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          name: "Jane Doe",
          email: "janedoe@example.com",
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("users", null, {}),
};
