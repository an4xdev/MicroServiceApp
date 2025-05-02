package org.student.microserviceapp.javaservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;
import org.student.microserviceapp.javaservice.responses.ApiResponse;
import org.student.microserviceapp.javaservice.services.company.ICompanyService;
import org.student.microserviceapp.javaservice.services.project.IProjectService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final IProjectService projectService;
    private final ICompanyService companyService;

    public ProjectController(IProjectService projectService,
                             ICompanyService companyService) {
        this.projectService = projectService;
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjects() {
        // TODO: implement getProjects
        var projects = projectService.getAllProjects();
        return projects.toResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProject(@PathVariable UUID id) {
        // TODO: implement getProject
        var project = projectService.getProjectById(id);
        return project.toResponseEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UUID>> createProject(CreateProjectDTO createProjectDto) {
        // TODO: implement createProject
        var projectId = projectService.createProject(createProjectDto);
        return projectId.toResponseEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> updateProject(@PathVariable UUID id, @RequestBody CreateProjectDTO createProjectDTO) {
        // TODO: implement updateProject
        var project = projectService.updateProject(id, createProjectDTO);
        return project.toResponseEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable UUID id) {
        // TODO: implement deleteProject
        var response = projectService.deleteProject(id);
        return response.toResponseEntity();
    }
}
