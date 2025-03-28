const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaskStatuses', {
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
    tableName: 'TaskStatuses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_TaskStatuses",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
