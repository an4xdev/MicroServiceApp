from typing import List, Optional

from sqlalchemy import Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, PrimaryKeyConstraint, String, Text, Uuid, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import uuid

class Base(DeclarativeBase):
    pass


class Companies(Base):
    __tablename__ = 'Companies'
    __table_args__ = (
        PrimaryKeyConstraint('Id', name='PK_Companies'),
    )

    Id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Text)

    Projects: Mapped[List['Projects']] = relationship('Projects', back_populates='Companies_')


class TaskStatuses(Base):
    __tablename__ = 'TaskStatuses'
    __table_args__ = (
        PrimaryKeyConstraint('Id', name='PK_TaskStatuses'),
    )

    Id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Text)

    Tasks: Mapped[List['Tasks']] = relationship('Tasks', back_populates='TaskStatuses_')


class TaskTypes(Base):
    __tablename__ = 'TaskTypes'
    __table_args__ = (
        PrimaryKeyConstraint('Id', name='PK_TaskTypes'),
    )

    Id: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=False, cache=1), primary_key=True)
    Name: Mapped[str] = mapped_column(Text)

    Tasks: Mapped[List['Tasks']] = relationship('Tasks', back_populates='TaskTypes_')


class Team(Base):
    __tablename__ = 'Team'
    __table_args__ = (
        ForeignKeyConstraint(['ManagerId'], ['Users.Id'], ondelete='CASCADE', name='FK_Team_Users_ManagerId'),
        PrimaryKeyConstraint('Id', name='PK_Team'),
        Index('IX_Team_ManagerId', 'ManagerId')
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    Name: Mapped[str] = mapped_column(Text)
    ManagerId: Mapped[uuid.UUID] = mapped_column(Uuid)

    Users: Mapped['Users'] = relationship('Users', foreign_keys=[ManagerId], back_populates='Team_')
    Users_: Mapped[List['Users']] = relationship('Users', foreign_keys='[Users.TeamId]', back_populates='Team1')
    Sprints: Mapped[List['Sprints']] = relationship('Sprints', back_populates='Team_')


class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        ForeignKeyConstraint(['TeamId'], ['Team.Id'], name='FK_Users_Team_TeamId'),
        PrimaryKeyConstraint('Id', name='PK_Users'),
        Index('IX_Users_TeamId', 'TeamId'),
        Index('IX_Users_Username', 'Username', unique=True)
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    Username: Mapped[str] = mapped_column(Text)
    PasswordHash: Mapped[str] = mapped_column(Text)
    Role: Mapped[str] = mapped_column(String(13))
    PasswordSalt: Mapped[str] = mapped_column(Text, server_default=text("''::text"))
    RefreshToken: Mapped[Optional[str]] = mapped_column(Text)
    RefreshTokenExpiryTime: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    Avatar: Mapped[Optional[str]] = mapped_column(Text)
    TeamId: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)

    Team_: Mapped[List['Team']] = relationship('Team', foreign_keys='[Team.ManagerId]', back_populates='Users')
    Team1: Mapped[Optional['Team']] = relationship('Team', foreign_keys=[TeamId], back_populates='Users_')
    Sprints: Mapped[List['Sprints']] = relationship('Sprints', back_populates='Users_')
    Tasks: Mapped[List['Tasks']] = relationship('Tasks', back_populates='Users_')


class EFMigrationsHistory(Base):
    __tablename__ = '__EFMigrationsHistory'
    __table_args__ = (
        PrimaryKeyConstraint('MigrationId', name='PK___EFMigrationsHistory'),
    )

    MigrationId: Mapped[str] = mapped_column(String(150), primary_key=True)
    ProductVersion: Mapped[str] = mapped_column(String(32))


class Projects(Base):
    __tablename__ = 'Projects'
    __table_args__ = (
        ForeignKeyConstraint(['CompanyId'], ['Companies.Id'], ondelete='CASCADE', name='FK_Projects_Companies_CompanyId'),
        PrimaryKeyConstraint('Id', name='PK_Projects'),
        Index('IX_Projects_CompanyId', 'CompanyId')
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    Name: Mapped[str] = mapped_column(Text)
    StartDate: Mapped[datetime.date] = mapped_column(Date)
    EndDate: Mapped[datetime.date] = mapped_column(Date)
    CompanyId: Mapped[int] = mapped_column(Integer)

    Companies_: Mapped['Companies'] = relationship('Companies', back_populates='Projects')
    Sprints: Mapped[List['Sprints']] = relationship('Sprints', back_populates='Projects_')


class Sprints(Base):
    __tablename__ = 'Sprints'
    __table_args__ = (
        ForeignKeyConstraint(['ManagerId'], ['Users.Id'], ondelete='CASCADE', name='FK_Sprints_Users_ManagerId'),
        ForeignKeyConstraint(['ProjectId'], ['Projects.Id'], name='FK_Sprints_Projects_ProjectId'),
        ForeignKeyConstraint(['TeamId'], ['Team.Id'], ondelete='CASCADE', name='FK_Sprints_Team_TeamId'),
        PrimaryKeyConstraint('Id', name='PK_Sprints'),
        Index('IX_Sprints_ManagerId', 'ManagerId'),
        Index('IX_Sprints_ProjectId', 'ProjectId'),
        Index('IX_Sprints_TeamId', 'TeamId')
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    Name: Mapped[str] = mapped_column(Text)
    StartDate: Mapped[datetime.date] = mapped_column(Date)
    EndDate: Mapped[datetime.date] = mapped_column(Date)
    ManagerId: Mapped[uuid.UUID] = mapped_column(Uuid)
    TeamId: Mapped[uuid.UUID] = mapped_column(Uuid, server_default=text("'00000000-0000-0000-0000-000000000000'::uuid"))
    ProjectId: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)

    Users_: Mapped['Users'] = relationship('Users', back_populates='Sprints')
    Projects_: Mapped[Optional['Projects']] = relationship('Projects', back_populates='Sprints')
    Team_: Mapped['Team'] = relationship('Team', back_populates='Sprints')
    Tasks: Mapped[List['Tasks']] = relationship('Tasks', back_populates='Sprints_')


class Tasks(Base):
    __tablename__ = 'Tasks'
    __table_args__ = (
        ForeignKeyConstraint(['DeveloperId'], ['Users.Id'], ondelete='CASCADE', name='FK_Tasks_Users_DeveloperId'),
        ForeignKeyConstraint(['SprintId'], ['Sprints.Id'], name='FK_Tasks_Sprints_SprintId'),
        ForeignKeyConstraint(['TaskStatusId'], ['TaskStatuses.Id'], ondelete='CASCADE', name='FK_Tasks_TaskStatuses_TaskStatusId'),
        ForeignKeyConstraint(['TaskTypeId'], ['TaskTypes.Id'], ondelete='CASCADE', name='FK_Tasks_TaskTypes_TaskTypeId'),
        PrimaryKeyConstraint('Id', name='PK_Tasks'),
        Index('IX_Tasks_DeveloperId', 'DeveloperId'),
        Index('IX_Tasks_SprintId', 'SprintId'),
        Index('IX_Tasks_TaskStatusId', 'TaskStatusId'),
        Index('IX_Tasks_TaskTypeId', 'TaskTypeId')
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    Name: Mapped[str] = mapped_column(Text)
    TaskTypeId: Mapped[int] = mapped_column(Integer)
    TaskStatusId: Mapped[int] = mapped_column(Integer)
    DeveloperId: Mapped[uuid.UUID] = mapped_column(Uuid)
    Description: Mapped[Optional[str]] = mapped_column(Text)
    SprintId: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)

    Users_: Mapped['Users'] = relationship('Users', back_populates='Tasks')
    Sprints_: Mapped[Optional['Sprints']] = relationship('Sprints', back_populates='Tasks')
    TaskStatuses_: Mapped['TaskStatuses'] = relationship('TaskStatuses', back_populates='Tasks')
    TaskTypes_: Mapped['TaskTypes'] = relationship('TaskTypes', back_populates='Tasks')
    TaskHistories: Mapped[List['TaskHistories']] = relationship('TaskHistories', back_populates='Tasks_')


class TaskHistories(Base):
    __tablename__ = 'TaskHistories'
    __table_args__ = (
        ForeignKeyConstraint(['TaskId'], ['Tasks.Id'], ondelete='CASCADE', name='FK_TaskHistories_Tasks_TaskId'),
        PrimaryKeyConstraint('Id', name='PK_TaskHistories'),
        Index('IX_TaskHistories_TaskId', 'TaskId')
    )

    Id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    TaskId: Mapped[uuid.UUID] = mapped_column(Uuid)
    ChangeDate: Mapped[datetime.datetime] = mapped_column(DateTime(True))
    NewStatus: Mapped[str] = mapped_column(Text, server_default=text("''::text"))
    OldStatus: Mapped[Optional[str]] = mapped_column(Text)

    Tasks_: Mapped['Tasks'] = relationship('Tasks', back_populates='TaskHistories')
