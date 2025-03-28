var DataTypes = require("sequelize").DataTypes;
var _Companies = require("./Companies");
var _Projects = require("./Projects");
var _Sprints = require("./Sprints");
var _TaskHistories = require("./TaskHistories");
var _TaskStatuses = require("./TaskStatuses");
var _TaskTypes = require("./TaskTypes");
var _Tasks = require("./Tasks");
var _Users = require("./Users");

function initModels(sequelize) {
  var Companies = _Companies(sequelize, DataTypes);
  var Projects = _Projects(sequelize, DataTypes);
  var Sprints = _Sprints(sequelize, DataTypes);
  var TaskHistories = _TaskHistories(sequelize, DataTypes);
  var TaskStatuses = _TaskStatuses(sequelize, DataTypes);
  var TaskTypes = _TaskTypes(sequelize, DataTypes);
  var Tasks = _Tasks(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Projects.belongsTo(Companies, { as: "Company", foreignKey: "CompanyId" });
  Companies.hasMany(Projects, { as: "Projects", foreignKey: "CompanyId" });
  Sprints.belongsTo(Projects, { as: "Project", foreignKey: "ProjectId" });
  Projects.hasMany(Sprints, { as: "Sprints", foreignKey: "ProjectId" });
  Tasks.belongsTo(Sprints, { as: "Sprint", foreignKey: "SprintId" });
  Sprints.hasMany(Tasks, { as: "Tasks", foreignKey: "SprintId" });
  TaskHistories.belongsTo(TaskStatuses, {
    as: "NewStatus",
    foreignKey: "NewStatusId",
  });
  TaskStatuses.hasMany(TaskHistories, {
    as: "TaskHistories",
    foreignKey: "NewStatusId",
  });
  TaskHistories.belongsTo(TaskStatuses, {
    as: "OldStatus",
    foreignKey: "OldStatusId",
  });
  TaskStatuses.hasMany(TaskHistories, {
    as: "OldStatus_TaskHistories",
    foreignKey: "OldStatusId",
  });
  Tasks.belongsTo(TaskStatuses, {
    as: "TaskStatus",
    foreignKey: "TaskStatusId",
  });
  TaskStatuses.hasMany(Tasks, { as: "Tasks", foreignKey: "TaskStatusId" });
  Tasks.belongsTo(TaskTypes, { as: "TaskType", foreignKey: "TaskTypeId" });
  TaskTypes.hasMany(Tasks, { as: "Tasks", foreignKey: "TaskTypeId" });
  TaskHistories.belongsTo(Tasks, { as: "Task", foreignKey: "TaskId" });
  Tasks.hasMany(TaskHistories, { as: "TaskHistories", foreignKey: "TaskId" });
  Sprints.belongsTo(Users, { as: "Manager", foreignKey: "ManagerId" });
  Users.hasMany(Sprints, { as: "Sprints", foreignKey: "ManagerId" });
  Tasks.belongsTo(Users, { as: "Developer", foreignKey: "DeveloperId" });
  Users.hasMany(Tasks, { as: "Tasks", foreignKey: "DeveloperId" });

  return {
    Companies,
    Projects,
    Sprints,
    TaskHistories,
    TaskStatuses,
    TaskTypes,
    Tasks,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
