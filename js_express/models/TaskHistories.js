const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaskHistories', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    TaskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tasks',
        key: 'Id'
      }
    },
    ChangeDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    NewStatus: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    OldStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TaskHistories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_TaskHistories_TaskId",
        fields: [
          { name: "TaskId" },
        ]
      },
      {
        name: "PK_TaskHistories",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
