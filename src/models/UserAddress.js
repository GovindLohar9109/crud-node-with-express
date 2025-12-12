module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "UserAddress",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      address_line: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "user_addresses",
      schema: "public",
      timestamps: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      indexes: [
        {
          name: "user_addresses_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    },
  );
  UserAddress.associate = function (models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return UserAddress;
};
