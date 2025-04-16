package org.student.microserviceapp.javaservice.services.project;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;
import org.student.microserviceapp.javaservice.repositories.ProjectRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService implements IProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public ProjectDTO getProjectById(UUID id) {
        return null;
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return List.of();
    }

    @Override
    public UUID createProject(CreateProjectDTO createProjectDTO) {
        return null;
    }

    @Override
    public ProjectDTO updateProject(UUID id, CreateProjectDTO createProjectDTO) {
        return null;
    }

    @Override
    public void deleteProject(UUID id) {

    }
}
