import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Tasks, TasksId } from './Tasks';

export interface TaskTypesAttributes {
  Id?: number;
  Name: string;
}

export type TaskTypesPk = "Id";
export type TaskTypesId = TaskTypes[TaskTypesPk];
export type TaskTypesCreationAttributes = TaskTypesAttributes;

export class TaskTypes extends Model<TaskTypesAttributes, TaskTypesCreationAttributes> implements TaskTypesAttributes {
  Id!: number;
  Name!: string;

  // TaskTypes hasMany Tasks via TaskTypeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof TaskTypes {
    return TaskTypes.init({
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
  }
}
