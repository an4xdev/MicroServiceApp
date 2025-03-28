const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaskTypes', {
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
    tableName: 'TaskTypes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_TaskTypes",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
