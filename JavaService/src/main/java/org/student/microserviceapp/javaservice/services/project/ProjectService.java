package org.student.microserviceapp.javaservice.services.project;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;
import org.student.microserviceapp.javaservice.repositories.ProjectRepository;
import org.student.microserviceapp.javaservice.responses.Result;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService implements IProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Result<ProjectDTO> getProjectById(UUID id) {
        return null;
    }

    @Override
    public Result<List<ProjectDTO>> getAllProjects() {
        return null;
    }

    @Override
    public Result<UUID> createProject(CreateProjectDTO createProjectDTO) {
        return null;
    }

    @Override
    public Result<ProjectDTO> updateProject(UUID id, CreateProjectDTO createProjectDTO) {
        return null;
    }

    @Override
    public Result<Void> deleteProject(UUID id) {
        return null;
    }
}
