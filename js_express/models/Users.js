const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Role: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RefreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RefreshTokenExpiryTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PasswordSalt: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Users_Username",
        unique: true,
        fields: [
          { name: "Username" },
        ]
      },
      {
        name: "PK_Users",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
