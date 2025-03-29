package org.student.microserviceapp.javaservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.student.microserviceapp.javaservice.dto.CreateProjectDto;
import org.student.microserviceapp.javaservice.dto.ProjectDto;
import org.student.microserviceapp.javaservice.services.company.CompanyService;
import org.student.microserviceapp.javaservice.services.project.ProjectService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final CompanyService companyService;

    public ProjectController(ProjectService projectService, CompanyService companyService) {
        this.projectService = projectService;
        this.companyService = companyService;
    }

    @PostMapping
    public UUID createProject(CreateProjectDto createProjectDto) {
        // TODO: implement createProject
        return UUID.randomUUID();
    }

    @GetMapping
    public List<ProjectDto> getProjects() {
        // TODO: implement getProjects
        return List.of(new ProjectDto(null));
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable UUID id) {
        // TODO: implement getProject
        return new ProjectDto(null);
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(@PathVariable UUID id, @RequestBody CreateProjectDto projectDto) {
        // TODO: implement updateProject
        return projectDto.toProjectDto();
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable UUID id) {
        // TODO: implement deleteProject
    }
}
