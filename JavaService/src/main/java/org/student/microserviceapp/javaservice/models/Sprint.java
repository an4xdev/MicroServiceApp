package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"Sprints\"", schema = "public", indexes = {
        @Index(name = "IX_Sprints_ManagerId", columnList = "ManagerId"),
        @Index(name = "IX_Sprints_ProjectId", columnList = "ProjectId")
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"ProjectId\"", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "sprint")
    private Set<Task> tasks = new LinkedHashSet<>();

}