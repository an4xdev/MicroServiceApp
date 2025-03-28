const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tasks', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TaskTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskTypes',
        key: 'Id'
      }
    },
    TaskStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskStatuses',
        key: 'Id'
      }
    },
    DeveloperId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Id'
      }
    },
    SprintId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sprints',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Tasks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Tasks_DeveloperId",
        fields: [
          { name: "DeveloperId" },
        ]
      },
      {
        name: "IX_Tasks_SprintId",
        fields: [
          { name: "SprintId" },
        ]
      },
      {
        name: "IX_Tasks_TaskStatusId",
        fields: [
          { name: "TaskStatusId" },
        ]
      },
      {
        name: "IX_Tasks_TaskTypeId",
        fields: [
          { name: "TaskTypeId" },
        ]
      },
      {
        name: "PK_Tasks",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
