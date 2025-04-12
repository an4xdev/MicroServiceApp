package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"Sprints\"", schema = "public", indexes = {
        @Index(name = "IX_Sprints_ManagerId", columnList = "ManagerId"),
        @Index(name = "IX_Sprints_ProjectId", columnList = "ProjectId"),
        @Index(name = "IX_Sprints_TeamId", columnList = "TeamId")
})
public class Sprint {
    @Id
    @Column(name = "\"Id\"", nullable = false)
    private UUID id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "\"StartDate\"", nullable = false)
    private LocalDate startDate;

    @Column(name = "\"EndDate\"", nullable = false)
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"ManagerId\"", nullable = false)
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"ProjectId\"")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ColumnDefault("'00000000-0000-0000-0000-000000000000'")
    @JoinColumn(name = "\"TeamId\"", nullable = false)
    private Team team;

}