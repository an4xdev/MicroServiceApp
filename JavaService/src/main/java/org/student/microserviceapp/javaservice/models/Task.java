package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"Tasks\"", schema = "public", indexes = {
        @Index(name = "IX_Tasks_TaskTypeId", columnList = "TaskTypeId"),
        @Index(name = "IX_Tasks_TaskStatusId", columnList = "TaskStatusId"),
        @Index(name = "IX_Tasks_DeveloperId", columnList = "DeveloperId"),
        @Index(name = "IX_Tasks_SprintId", columnList = "SprintId")
})
public class Task {
    @Id
    @Column(name = "\"Id\"", nullable = false)
    private UUID id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "\"Description\"", length = Integer.MAX_VALUE)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"TaskTypeId\"", nullable = false)
    private TaskType taskType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"TaskStatusId\"", nullable = false)
    private TaskStatus taskStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"DeveloperId\"", nullable = false)
    private User developer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"SprintId\"")
    private Sprint sprint;

}