import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sprints, SprintsId } from './Sprints';
import type { Tasks, TasksId } from './Tasks';

export interface UsersAttributes {
  Id: string;
  Username: string;
  PasswordHash: string;
  Role: string;
  RefreshToken?: string;
  RefreshTokenExpiryTime?: Date;
  Avatar?: string;
  PasswordSalt: string;
}

export type UsersPk = "Id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "RefreshToken" | "RefreshTokenExpiryTime" | "Avatar" | "PasswordSalt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  Id!: string;
  Username!: string;
  PasswordHash!: string;
  Role!: string;
  RefreshToken?: string;
  RefreshTokenExpiryTime?: Date;
  Avatar?: string;
  PasswordSalt!: string;

  // Users hasMany Sprints via ManagerId
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
  // Users hasMany Tasks via DeveloperId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Role: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RefreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RefreshTokenExpiryTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PasswordSalt: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Users_Username",
        unique: true,
        fields: [
          { name: "Username" },
        ]
      },
      {
        name: "PK_Users",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
