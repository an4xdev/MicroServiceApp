package org.student.microserviceapp.javaservice.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateProjectDto {
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private int companyId;

    public ProjectDto toProjectDto() {
        ProjectDto project = new ProjectDto();
        project.setName(name);
        project.setStartDate(startDate);
        project.setEndDate(endDate);
        project.setCompanyDto(project.getCompanyDto());
        return project;
    }
}
