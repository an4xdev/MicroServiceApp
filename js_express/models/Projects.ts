import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Companies, CompaniesId } from './Companies';
import type { Sprints, SprintsId } from './Sprints';

export interface ProjectsAttributes {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  CompanyId: number;
}

export type ProjectsPk = "Id";
export type ProjectsId = Projects[ProjectsPk];
export type ProjectsCreationAttributes = ProjectsAttributes;

export class Projects extends Model<ProjectsAttributes, ProjectsCreationAttributes> implements ProjectsAttributes {
  Id!: string;
  Name!: string;
  StartDate!: string;
  EndDate!: string;
  CompanyId!: number;

  // Projects belongsTo Companies via CompanyId
  Company!: Companies;
  getCompany!: Sequelize.BelongsToGetAssociationMixin<Companies>;
  setCompany!: Sequelize.BelongsToSetAssociationMixin<Companies, CompaniesId>;
  createCompany!: Sequelize.BelongsToCreateAssociationMixin<Companies>;
  // Projects hasMany Sprints via ProjectId
  Sprints!: Sprints[];
  getSprints!: Sequelize.HasManyGetAssociationsMixin<Sprints>;
  setSprints!: Sequelize.HasManySetAssociationsMixin<Sprints, SprintsId>;
  addSprint!: Sequelize.HasManyAddAssociationMixin<Sprints, SprintsId>;
  addSprints!: Sequelize.HasManyAddAssociationsMixin<Sprints, SprintsId>;
  createSprint!: Sequelize.HasManyCreateAssociationMixin<Sprints>;
  removeSprint!: Sequelize.HasManyRemoveAssociationMixin<Sprints, SprintsId>;
  removeSprints!: Sequelize.HasManyRemoveAssociationsMixin<Sprints, SprintsId>;
  hasSprint!: Sequelize.HasManyHasAssociationMixin<Sprints, SprintsId>;
  hasSprints!: Sequelize.HasManyHasAssociationsMixin<Sprints, SprintsId>;
  countSprints!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Projects {
    return Projects.init({
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
  }
}
