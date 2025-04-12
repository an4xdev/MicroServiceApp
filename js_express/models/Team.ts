import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sprints, SprintsId } from './Sprints';
import type { Users, UsersId } from './Users';

export interface TeamAttributes {
  Id: string;
  Name: string;
  ManagerId: string;
}

export type TeamPk = "Id";
export type TeamId = Team[TeamPk];
export type TeamCreationAttributes = TeamAttributes;

export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
  Id!: string;
  Name!: string;
  ManagerId!: string;

  // Team hasMany Sprints via TeamId
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
  // Team hasMany Users via TeamId
  Users!: Users[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<Users>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<Users, UsersId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<Users, UsersId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<Users, UsersId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<Users>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<Users, UsersId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<Users, UsersId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<Users, UsersId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<Users, UsersId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;
  // Team belongsTo Users via ManagerId
  Manager!: Users;
  getManager!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setManager!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createManager!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Team {
    return Team.init({
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ManagerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Team',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Team_ManagerId",
        fields: [
          { name: "ManagerId" },
        ]
      },
      {
        name: "PK_Team",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
  }
}
