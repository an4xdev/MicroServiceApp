import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Tasks, TasksId } from './Tasks';

export interface TaskHistoriesAttributes {
  Id: string;
  TaskId: string;
  ChangeDate: Date;
  NewStatus: string;
  OldStatus?: string;
}

export type TaskHistoriesPk = "Id";
export type TaskHistoriesId = TaskHistories[TaskHistoriesPk];
export type TaskHistoriesOptionalAttributes = "NewStatus" | "OldStatus";
export type TaskHistoriesCreationAttributes = Optional<TaskHistoriesAttributes, TaskHistoriesOptionalAttributes>;

export class TaskHistories extends Model<TaskHistoriesAttributes, TaskHistoriesCreationAttributes> implements TaskHistoriesAttributes {
  Id!: string;
  TaskId!: string;
  ChangeDate!: Date;
  NewStatus!: string;
  OldStatus?: string;

  // TaskHistories belongsTo Tasks via TaskId
  Task!: Tasks;
  getTask!: Sequelize.BelongsToGetAssociationMixin<Tasks>;
  setTask!: Sequelize.BelongsToSetAssociationMixin<Tasks, TasksId>;
  createTask!: Sequelize.BelongsToCreateAssociationMixin<Tasks>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TaskHistories {
    return TaskHistories.init({
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
    NewStatus: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    OldStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TaskHistories',
    schema: 'public',
    timestamps: false,
    indexes: [
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
  }
}
