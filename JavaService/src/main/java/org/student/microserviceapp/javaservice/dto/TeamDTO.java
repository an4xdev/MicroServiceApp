package org.student.microserviceapp.javaservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.student.microserviceapp.javaservice.models.Team;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class TeamDTO {
    private UUID id;

    private String name;

    private String Manager;

    public TeamDTO(Team team) {
        id = team.getId();
        name = team.getName();
        Manager = team.getManager().getUsername();
    }
}
