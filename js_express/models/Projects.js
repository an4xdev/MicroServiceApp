const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projects', {
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
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Projects',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Projects_CompanyId",
        fields: [
          { name: "CompanyId" },
        ]
      },
      {
        name: "PK_Projects",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
