package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"TaskStatuses\"", schema = "public")
public class TaskStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TaskStatuses_id_gen")
    @SequenceGenerator(name = "TaskStatuses_id_gen", sequenceName = "TaskStatus_Id_seq", allocationSize = 1)
    @Column(name = "\"Id\"", nullable = false)
    private Integer id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @OneToMany(mappedBy = "taskStatus")
    private Set<Task> tasks = new LinkedHashSet<>();

}