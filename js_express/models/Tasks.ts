import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sprints, SprintsId } from './Sprints';
import type { TaskHistories, TaskHistoriesId } from './TaskHistories';
import type { TaskStatuses, TaskStatusesId } from './TaskStatuses';
import type { TaskTypes, TaskTypesId } from './TaskTypes';
import type { Users, UsersId } from './Users';

export interface TasksAttributes {
  Id: string;
  Name: string;
  Description?: string;
  TaskTypeId: number;
  TaskStatusId: number;
  DeveloperId: string;
  SprintId?: string;
}

export type TasksPk = "Id";
export type TasksId = Tasks[TasksPk];
export type TasksOptionalAttributes = "Description" | "SprintId";
export type TasksCreationAttributes = Optional<TasksAttributes, TasksOptionalAttributes>;

export class Tasks extends Model<TasksAttributes, TasksCreationAttributes> implements TasksAttributes {
  Id!: string;
  Name!: string;
  Description?: string;
  TaskTypeId!: number;
  TaskStatusId!: number;
  DeveloperId!: string;
  SprintId?: string;

  // Tasks belongsTo Sprints via SprintId
  Sprint!: Sprints;
  getSprint!: Sequelize.BelongsToGetAssociationMixin<Sprints>;
  setSprint!: Sequelize.BelongsToSetAssociationMixin<Sprints, SprintsId>;
  createSprint!: Sequelize.BelongsToCreateAssociationMixin<Sprints>;
  // Tasks belongsTo TaskStatuses via TaskStatusId
  TaskStatus!: TaskStatuses;
  getTaskStatus!: Sequelize.BelongsToGetAssociationMixin<TaskStatuses>;
  setTaskStatus!: Sequelize.BelongsToSetAssociationMixin<TaskStatuses, TaskStatusesId>;
  createTaskStatus!: Sequelize.BelongsToCreateAssociationMixin<TaskStatuses>;
  // Tasks belongsTo TaskTypes via TaskTypeId
  TaskType!: TaskTypes;
  getTaskType!: Sequelize.BelongsToGetAssociationMixin<TaskTypes>;
  setTaskType!: Sequelize.BelongsToSetAssociationMixin<TaskTypes, TaskTypesId>;
  createTaskType!: Sequelize.BelongsToCreateAssociationMixin<TaskTypes>;
  // Tasks hasMany TaskHistories via TaskId
  TaskHistories!: TaskHistories[];
  getTaskHistories!: Sequelize.HasManyGetAssociationsMixin<TaskHistories>;
  setTaskHistories!: Sequelize.HasManySetAssociationsMixin<TaskHistories, TaskHistoriesId>;
  addTaskHistory!: Sequelize.HasManyAddAssociationMixin<TaskHistories, TaskHistoriesId>;
  addTaskHistories!: Sequelize.HasManyAddAssociationsMixin<TaskHistories, TaskHistoriesId>;
  createTaskHistory!: Sequelize.HasManyCreateAssociationMixin<TaskHistories>;
  removeTaskHistory!: Sequelize.HasManyRemoveAssociationMixin<TaskHistories, TaskHistoriesId>;
  removeTaskHistories!: Sequelize.HasManyRemoveAssociationsMixin<TaskHistories, TaskHistoriesId>;
  hasTaskHistory!: Sequelize.HasManyHasAssociationMixin<TaskHistories, TaskHistoriesId>;
  hasTaskHistories!: Sequelize.HasManyHasAssociationsMixin<TaskHistories, TaskHistoriesId>;
  countTaskHistories!: Sequelize.HasManyCountAssociationsMixin;
  // Tasks belongsTo Users via DeveloperId
  Developer!: Users;
  getDeveloper!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setDeveloper!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createDeveloper!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tasks {
    return Tasks.init({
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
  }
}
