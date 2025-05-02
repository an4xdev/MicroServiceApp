package org.student.microserviceapp.javaservice.services.team;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.dto.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.TeamDTO;
import org.student.microserviceapp.javaservice.repositories.TeamRepository;
import org.student.microserviceapp.javaservice.responses.Result;

import java.util.List;
import java.util.UUID;

@Service
public class TeamService implements ITeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Result<TeamDTO> getTeamById(UUID id) {
        return null;
    }

    @Override
    public Result<List<TeamDTO>> getAllTeams() {
        return null;
    }

    @Override
    public Result<UUID> createTeam(CreateTeamDTO createTeamDTO) {
        return null;
    }

    @Override
    public Result<TeamDTO> updateTeam(UUID id, CreateTeamDTO createTeamDTO) {
        return null;
    }

    @Override
    public Result<Void> deleteTeam(UUID id) {
        return null;
    }
}
