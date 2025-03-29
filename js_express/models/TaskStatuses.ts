import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Tasks, TasksId } from './Tasks';

export interface TaskStatusesAttributes {
  Id: number;
  Name: string;
}

export type TaskStatusesPk = "Id";
export type TaskStatusesId = TaskStatuses[TaskStatusesPk];
export type TaskStatusesCreationAttributes = TaskStatusesAttributes;

export class TaskStatuses extends Model<TaskStatusesAttributes, TaskStatusesCreationAttributes> implements TaskStatusesAttributes {
  Id!: number;
  Name!: string;

  // TaskStatuses hasMany Tasks via TaskStatusId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof TaskStatuses {
    return TaskStatuses.init({
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
  }
}
