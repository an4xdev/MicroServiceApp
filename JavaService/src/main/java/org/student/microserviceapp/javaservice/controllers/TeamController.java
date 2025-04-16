package org.student.microserviceapp.javaservice.controllers;

import org.springframework.web.bind.annotation.*;
import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.CreateTeamDTO;
import org.student.microserviceapp.javaservice.dto.TeamDTO;
import org.student.microserviceapp.javaservice.services.team.ITeamService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class TeamController {

    private final ITeamService teamService;

    public TeamController(ITeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<TeamDTO> getTeams() {
        // TODO: implement getTeams
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public TeamDTO getTeam(@PathVariable UUID id) {
        // TODO: implement getTeam
        return teamService.getTeamById(id);
    }

    @PostMapping
    public UUID createTeam(@RequestBody CreateTeamDTO createTeamDTO) {
        // TODO: implement createTeam
        return teamService.createTeam(createTeamDTO);
    }

    @PutMapping("/{id}")
    public TeamDTO updateTeam(@PathVariable UUID id, @RequestBody CreateTeamDTO createTeamDTO) {
        // TODO: implement updateTeam
        return teamService.updateTeam(id, createTeamDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable UUID id) {
        // TODO: implement deleteTeam
        teamService.deleteTeam(id);
    }

}
