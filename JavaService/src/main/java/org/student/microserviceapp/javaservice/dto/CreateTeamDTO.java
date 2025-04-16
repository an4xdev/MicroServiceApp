package org.student.microserviceapp.javaservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateTeamDTO {
    public String name;
    public UUID managerId;
}
