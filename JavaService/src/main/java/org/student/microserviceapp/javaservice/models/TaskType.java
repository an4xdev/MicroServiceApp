package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "\"TaskTypes\"", schema = "public")
public class TaskType {
    @Id
    @Column(name = "\"Id\"", nullable = false)
    private Integer id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

}