package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"TaskHistories\"", schema = "public", indexes = {
        @Index(name = "IX_TaskHistories_TaskId", columnList = "TaskId")
})
public class TaskHistory {
    @Id
    @Column(name = "\"Id\"", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "\"TaskId\"", nullable = false)
    private Task task;

    @Column(name = "\"ChangeDate\"", nullable = false)
    private OffsetDateTime changeDate;

    @ColumnDefault("''")
    @Column(name = "\"NewStatus\"", nullable = false, length = Integer.MAX_VALUE)
    private String newStatus;

    @Column(name = "\"OldStatus\"", length = Integer.MAX_VALUE)
    private String oldStatus;

}