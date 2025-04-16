package org.student.microserviceapp.javaservice.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateProjectDTO {
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private int companyId;

    // ??
//    public ProjectDTO toProjectDto() {
//        ProjectDTO project = new ProjectDTO();
//        project.setName(name);
//        project.setStartDate(startDate);
//        project.setEndDate(endDate);
//        project.setCompanyDto(project.getCompanyDto());
//        return project;
//    }
}
