package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"TaskTypes\"", schema = "public")
public class TaskType {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TaskTypes_id_gen")
    @SequenceGenerator(name = "TaskTypes_id_gen", sequenceName = "TaskType_Id_seq", allocationSize = 1)
    @Column(name = "\"Id\"", nullable = false)
    private Integer id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @OneToMany(mappedBy = "taskType")
    private Set<Task> tasks = new LinkedHashSet<>();

}