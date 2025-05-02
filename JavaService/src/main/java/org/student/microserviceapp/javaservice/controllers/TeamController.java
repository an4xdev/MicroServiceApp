package org.student.microserviceapp.javaservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.student.microserviceapp.javaservice.dto.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.TeamDTO;
import org.student.microserviceapp.javaservice.responses.ApiResponse;
import org.student.microserviceapp.javaservice.services.team.ITeamService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final ITeamService teamService;

    public TeamController(ITeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TeamDTO>>> getTeams() {
        // TODO: implement getTeams
        var teams = teamService.getAllTeams();
        return teams.toResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TeamDTO>> getTeam(@PathVariable UUID id) {
        // TODO: implement getTeam
        var team = teamService.getTeamById(id);
        return team.toResponseEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UUID>> createTeam(@RequestBody CreateTeamDTO createTeamDTO) {
        // TODO: implement createTeam
        var teamId = teamService.createTeam(createTeamDTO);
        return teamId.toResponseEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TeamDTO>> updateTeam(@PathVariable UUID id, @RequestBody CreateTeamDTO createTeamDTO) {
        // TODO: implement updateTeam
        var team = teamService.updateTeam(id, createTeamDTO);
        return team.toResponseEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTeam(@PathVariable UUID id) {
        // TODO: implement deleteTeam
        var result = teamService.deleteTeam(id);
        return result.toResponseEntity();
    }

}
