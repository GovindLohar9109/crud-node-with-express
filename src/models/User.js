module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "users_email_key",
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "public",
      timestamps: true,
      paranoid: true,

      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",

      indexes: [
        {
          name: "users_email_key",
          unique: true,
          fields: [{ name: "email" }],
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    },
  );
  User.associate = function (models) {
    this.hasMany(models.UserAddress, {
      foreignKey: "user_id",
      as: "addresses",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return User;
};
