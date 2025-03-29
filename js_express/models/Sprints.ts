import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Projects, ProjectsId } from './Projects';
import type { Tasks, TasksId } from './Tasks';
import type { Users, UsersId } from './Users';

export interface SprintsAttributes {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
  ManagerId: string;
  ProjectId: string;
}

export type SprintsPk = "Id";
export type SprintsId = Sprints[SprintsPk];
export type SprintsCreationAttributes = SprintsAttributes;

export class Sprints extends Model<SprintsAttributes, SprintsCreationAttributes> implements SprintsAttributes {
  Id!: string;
  Name!: string;
  StartDate!: string;
  EndDate!: string;
  ManagerId!: string;
  ProjectId!: string;

  // Sprints belongsTo Projects via ProjectId
  Project!: Projects;
  getProject!: Sequelize.BelongsToGetAssociationMixin<Projects>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<Projects, ProjectsId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<Projects>;
  // Sprints hasMany Tasks via SprintId
  Tasks!: Tasks[];
  getTasks!: Sequelize.HasManyGetAssociationsMixin<Tasks>;
  setTasks!: Sequelize.HasManySetAssociationsMixin<Tasks, TasksId>;
  addTask!: Sequelize.HasManyAddAssociationMixin<Tasks, TasksId>;
  addTasks!: Sequelize.HasManyAddAssociationsMixin<Tasks, TasksId>;
  createTask!: Sequelize.HasManyCreateAssociationMixin<Tasks>;
  removeTask!: Sequelize.HasManyRemoveAssociationMixin<Tasks, TasksId>;
  removeTasks!: Sequelize.HasManyRemoveAssociationsMixin<Tasks, TasksId>;
  hasTask!: Sequelize.HasManyHasAssociationMixin<Tasks, TasksId>;
  hasTasks!: Sequelize.HasManyHasAssociationsMixin<Tasks, TasksId>;
  countTasks!: Sequelize.HasManyCountAssociationsMixin;
  // Sprints belongsTo Users via ManagerId
  Manager!: Users;
  getManager!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setManager!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createManager!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sprints {
    return Sprints.init({
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
  }
}
