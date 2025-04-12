package org.student.microserviceapp.javaservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.student.microserviceapp.javaservice.models.Project;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDto {

    private UUID id;


    private String name;


    private LocalDate startDate;


    private LocalDate endDate;


    private CompanyDto companyDto;

    public ProjectDto(Project project){
        id = project.getId();
        name = project.getName();
        startDate = project.getStartDate();
        endDate = project.getEndDate();
        companyDto = new CompanyDto(project.getCompany());
    }

}
