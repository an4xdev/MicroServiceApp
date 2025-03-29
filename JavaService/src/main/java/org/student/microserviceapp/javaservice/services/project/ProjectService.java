package org.student.microserviceapp.javaservice.services.project;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.repositories.ProjectRepository;

@Service
public class ProjectService implements IProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
}
