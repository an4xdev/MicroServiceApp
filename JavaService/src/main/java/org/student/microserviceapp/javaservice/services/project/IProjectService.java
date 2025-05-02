package org.student.microserviceapp.javaservice.services.project;

import org.student.microserviceapp.javaservice.dto.CreateProjectDTO;
import org.student.microserviceapp.javaservice.dto.ProjectDTO;
import org.student.microserviceapp.javaservice.responses.Result;

import java.util.List;
import java.util.UUID;

public interface IProjectService {
    Result<ProjectDTO> getProjectById(UUID id);

    Result<List<ProjectDTO>> getAllProjects();

    Result<UUID> createProject(CreateProjectDTO createProjectDTO);

    Result<ProjectDTO> updateProject(UUID id, CreateProjectDTO createProjectDTO);

    Result<Void> deleteProject(UUID id);
}
