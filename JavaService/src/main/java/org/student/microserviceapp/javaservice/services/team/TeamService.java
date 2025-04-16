package org.student.microserviceapp.javaservice.services.team;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.dto.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.TeamDTO;
import org.student.microserviceapp.javaservice.repositories.TeamRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TeamService implements ITeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public TeamDTO getTeamById(UUID id) {
        return null;
    }

    @Override
    public List<TeamDTO> getAllTeams() {
        return List.of();
    }

    @Override
    public UUID createTeam(CreateTeamDTO createTeamDTO) {
        return null;
    }

    @Override
    public TeamDTO updateTeam(UUID id, CreateTeamDTO createTeamDTO) {
        return null;
    }

    @Override
    public void deleteTeam(UUID id) {

    }
}
