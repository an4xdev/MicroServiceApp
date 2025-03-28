const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Companies', {
    Id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Companies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_Companies",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
