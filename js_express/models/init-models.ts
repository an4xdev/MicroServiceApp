import type { Sequelize } from "sequelize";
import { Companies as _Companies } from "./Companies";
import type { CompaniesAttributes, CompaniesCreationAttributes } from "./Companies";
import { Projects as _Projects } from "./Projects";
import type { ProjectsAttributes, ProjectsCreationAttributes } from "./Projects";
import { Sprints as _Sprints } from "./Sprints";
import type { SprintsAttributes, SprintsCreationAttributes } from "./Sprints";
import { TaskHistories as _TaskHistories } from "./TaskHistories";
import type { TaskHistoriesAttributes, TaskHistoriesCreationAttributes } from "./TaskHistories";
import { TaskStatuses as _TaskStatuses } from "./TaskStatuses";
import type { TaskStatusesAttributes, TaskStatusesCreationAttributes } from "./TaskStatuses";
import { TaskTypes as _TaskTypes } from "./TaskTypes";
import type { TaskTypesAttributes, TaskTypesCreationAttributes } from "./TaskTypes";
import { Tasks as _Tasks } from "./Tasks";
import type { TasksAttributes, TasksCreationAttributes } from "./Tasks";
import { Team as _Team } from "./Team";
import type { TeamAttributes, TeamCreationAttributes } from "./Team";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";
import { __EFMigrationsHistory as ___EFMigrationsHistory } from "./__EFMigrationsHistory";
import type { __EFMigrationsHistoryAttributes, __EFMigrationsHistoryCreationAttributes } from "./__EFMigrationsHistory";

export {
  _Companies as Companies,
  _Projects as Projects,
  _Sprints as Sprints,
  _TaskHistories as TaskHistories,
  _TaskStatuses as TaskStatuses,
  _TaskTypes as TaskTypes,
  _Tasks as Tasks,
  _Team as Team,
  _Users as Users,
  ___EFMigrationsHistory as __EFMigrationsHistory,
};

export type {
  CompaniesAttributes,
  CompaniesCreationAttributes,
  ProjectsAttributes,
  ProjectsCreationAttributes,
  SprintsAttributes,
  SprintsCreationAttributes,
  TaskHistoriesAttributes,
  TaskHistoriesCreationAttributes,
  TaskStatusesAttributes,
  TaskStatusesCreationAttributes,
  TaskTypesAttributes,
  TaskTypesCreationAttributes,
  TasksAttributes,
  TasksCreationAttributes,
  TeamAttributes,
  TeamCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  __EFMigrationsHistoryAttributes,
  __EFMigrationsHistoryCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Companies = _Companies.initModel(sequelize);
  const Projects = _Projects.initModel(sequelize);
  const Sprints = _Sprints.initModel(sequelize);
  const TaskHistories = _TaskHistories.initModel(sequelize);
  const TaskStatuses = _TaskStatuses.initModel(sequelize);
  const TaskTypes = _TaskTypes.initModel(sequelize);
  const Tasks = _Tasks.initModel(sequelize);
  const Team = _Team.initModel(sequelize);
  const Users = _Users.initModel(sequelize);
  const __EFMigrationsHistory = ___EFMigrationsHistory.initModel(sequelize);

  Projects.belongsTo(Companies, { as: "Company", foreignKey: "CompanyId"});
  Companies.hasMany(Projects, { as: "Projects", foreignKey: "CompanyId"});
  Sprints.belongsTo(Projects, { as: "Project", foreignKey: "ProjectId"});
  Projects.hasMany(Sprints, { as: "Sprints", foreignKey: "ProjectId"});
  Tasks.belongsTo(Sprints, { as: "Sprint", foreignKey: "SprintId"});
  Sprints.hasMany(Tasks, { as: "Tasks", foreignKey: "SprintId"});
  Tasks.belongsTo(TaskStatuses, { as: "TaskStatus", foreignKey: "TaskStatusId"});
  TaskStatuses.hasMany(Tasks, { as: "Tasks", foreignKey: "TaskStatusId"});
  Tasks.belongsTo(TaskTypes, { as: "TaskType", foreignKey: "TaskTypeId"});
  TaskTypes.hasMany(Tasks, { as: "Tasks", foreignKey: "TaskTypeId"});
  TaskHistories.belongsTo(Tasks, { as: "Task", foreignKey: "TaskId"});
  Tasks.hasMany(TaskHistories, { as: "TaskHistories", foreignKey: "TaskId"});
  Sprints.belongsTo(Team, { as: "Team", foreignKey: "TeamId"});
  Team.hasMany(Sprints, { as: "Sprints", foreignKey: "TeamId"});
  Users.belongsTo(Team, { as: "Team_Team", foreignKey: "TeamId"});
  Team.hasMany(Users, { as: "Users", foreignKey: "TeamId"});
  Sprints.belongsTo(Users, { as: "Manager", foreignKey: "ManagerId"});
  Users.hasMany(Sprints, { as: "Sprints", foreignKey: "ManagerId"});
  Tasks.belongsTo(Users, { as: "Developer", foreignKey: "DeveloperId"});
  Users.hasMany(Tasks, { as: "Tasks", foreignKey: "DeveloperId"});
  Team.belongsTo(Users, { as: "Manager", foreignKey: "ManagerId"});
  Users.hasMany(Team, { as: "Teams", foreignKey: "ManagerId"});

  return {
    Companies: Companies,
    Projects: Projects,
    Sprints: Sprints,
    TaskHistories: TaskHistories,
    TaskStatuses: TaskStatuses,
    TaskTypes: TaskTypes,
    Tasks: Tasks,
    Team: Team,
    Users: Users,
    __EFMigrationsHistory: __EFMigrationsHistory,
  };
}
