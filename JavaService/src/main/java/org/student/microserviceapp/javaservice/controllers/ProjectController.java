package org.student.microserviceapp.javaservice.controllers;

import org.springframework.web.bind.annotation.*;
import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;
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
    public List<ProjectDTO> getProjects() {
        // TODO: implement getProjects
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ProjectDTO getProject(@PathVariable UUID id) {
        // TODO: implement getProject
        return projectService.getProjectById(id);
    }

    @PostMapping
    public UUID createProject(CreateProjectDTO createProjectDto) {
        // TODO: implement createProject
        return projectService.createProject(createProjectDto);
    }

    @PutMapping("/{id}")
    public ProjectDTO updateProject(@PathVariable UUID id, @RequestBody CreateProjectDTO createProjectDTO) {
        // TODO: implement updateProject
        return projectService.updateProject(id, createProjectDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable UUID id) {
        // TODO: implement deleteProject
        projectService.deleteProject(id);
    }
}
