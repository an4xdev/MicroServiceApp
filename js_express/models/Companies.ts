import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Projects, ProjectsId } from './Projects';

export interface CompaniesAttributes {
  Id: number;
  Name: string;
}

export type CompaniesPk = "Id";
export type CompaniesId = Companies[CompaniesPk];
export type CompaniesCreationAttributes = CompaniesAttributes;

export class Companies extends Model<CompaniesAttributes, CompaniesCreationAttributes> implements CompaniesAttributes {
  Id!: number;
  Name!: string;

  // Companies hasMany Projects via CompanyId
  Projects!: Projects[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<Projects>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<Projects, ProjectsId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<Projects, ProjectsId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<Projects, ProjectsId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<Projects>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<Projects, ProjectsId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<Projects, ProjectsId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<Projects, ProjectsId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<Projects, ProjectsId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Companies {
    return Companies.init({
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
  }
}
