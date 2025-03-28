const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sprints', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ManagerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Id'
      }
    },
    ProjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Sprints',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Sprints_ManagerId",
        fields: [
          { name: "ManagerId" },
        ]
      },
      {
        name: "IX_Sprints_ProjectId",
        fields: [
          { name: "ProjectId" },
        ]
      },
      {
        name: "PK_Sprints",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
