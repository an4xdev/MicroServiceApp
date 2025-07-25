package org.student.microserviceapp.javaservice.services.team;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.student.microserviceapp.javaservice.dto.team.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.team.TeamDTO;
import org.student.microserviceapp.javaservice.models.Roles;
import org.student.microserviceapp.javaservice.repositories.TeamRepository;
import org.student.microserviceapp.javaservice.responses.Result;
import org.student.microserviceapp.javaservice.services.user.IUserService;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class TeamService implements ITeamService {
    private final TeamRepository teamRepository;
    private final IUserService userService;

    public TeamService(TeamRepository teamRepository, IUserService userService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
    }

    @Override
    @Transactional(readOnly = true)
    public Result<TeamDTO> getTeamById(UUID id) {
        var team = teamRepository.findById(id);
        if (team.isEmpty()) {
            return Result.notFound("Team not found");
        }
        var teamDTO = new TeamDTO(team.get());
        return Result.success(teamDTO, "Team found");
    }

    @Override
    @Transactional(readOnly = true)
    public Result<List<TeamDTO>> getAllTeams() {
        var teams = teamRepository.findAll();
        if (teams.isEmpty()) {
            return Result.notFound("No teams found");
        }
        var teamDTOs = teams.stream()
                .map(TeamDTO::new)
                .toList();
        return Result.success(teamDTOs, "Teams found");
    }

    @Override
    @Transactional
    public Result<UUID> createTeam(CreateTeamDTO createTeamDTO) {
        var user = userService.findById(createTeamDTO.getManagerId());
        if (user.isEmpty()) {
            return Result.notFound("User not found");
        }

        var existingUser = user.get();

        if (!Objects.equals(existingUser.getRole(), Roles.MANAGER)) {
            return Result.badRequest("User is not a manager");
        }

        var team = createTeamDTO.toTeam();
        team.setId(UUID.randomUUID());
        team.setManager(existingUser);
        teamRepository.save(team);
        return Result.success(team.getId(), "Team created successfully");
    }

    @Override
    @Transactional
    public Result<TeamDTO> updateTeam(UUID id, CreateTeamDTO createTeamDTO) {
        var team = teamRepository.findById(id);

        if (team.isEmpty()) {
            return Result.notFound("Team not found");
        }

        var existingTeam = team.get();

        if (createTeamDTO.getManagerId() != null) {
            var user = userService.findById(createTeamDTO.getManagerId());
            if (user.isEmpty()) {
                return Result.notFound("User not found");
            }
            var existingUser = user.get();
            if (!Objects.equals(existingUser.getRole(), Roles.MANAGER)) {
                return Result.badRequest("User is not a manager");
            }
            existingTeam.setManager(existingUser);
        }

        if (createTeamDTO.getName() != null && !createTeamDTO.getName().isBlank()) {
            existingTeam.setName(createTeamDTO.getName());
        }

        teamRepository.save(existingTeam);
        var teamDTO = new TeamDTO(existingTeam);

        return Result.success(teamDTO, "Team updated successfully");
    }

    @Override
    @Transactional
    public Result<Void> deleteTeam(UUID id) {
        var team = teamRepository.findById(id);
        if (team.isEmpty()) {
            return Result.notFound("Team not found");
        }
        teamRepository.delete(team.get());
        return Result.noContent();
    }
}
