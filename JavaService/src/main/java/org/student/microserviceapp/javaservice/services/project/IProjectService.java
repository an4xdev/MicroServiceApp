package org.student.microserviceapp.javaservice.services.project;

import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;

import java.util.List;
import java.util.UUID;

public interface IProjectService {
    ProjectDTO getProjectById(UUID id);

    List<ProjectDTO> getAllProjects();

    UUID createProject(CreateProjectDTO createProjectDTO);

    ProjectDTO updateProject(UUID id, CreateProjectDTO createProjectDTO);

    void deleteProject(UUID id);
}
