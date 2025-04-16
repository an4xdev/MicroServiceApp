package org.student.microserviceapp.javaservice.services.team;

import org.student.microserviceapp.javaservice.dto.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.TeamDTO;

import java.util.List;
import java.util.UUID;

public interface ITeamService {
    TeamDTO getTeamById(UUID id);

    List<TeamDTO> getAllTeams();

    UUID createTeam(CreateTeamDTO createTeamDTO);

    TeamDTO updateTeam(UUID id, CreateTeamDTO createTeamDTO);

    void deleteTeam(UUID id);
}
