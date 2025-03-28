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
    OldStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskStatuses',
        key: 'Id'
      }
    },
    NewStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskStatuses',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'TaskHistories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_TaskHistories_NewStatusId",
        fields: [
          { name: "NewStatusId" },
        ]
      },
      {
        name: "IX_TaskHistories_OldStatusId",
        fields: [
          { name: "OldStatusId" },
        ]
      },
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
