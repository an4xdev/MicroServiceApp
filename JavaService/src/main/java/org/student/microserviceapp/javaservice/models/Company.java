package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"Companies\"", schema = "public")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Companies_id_gen")
    @SequenceGenerator(name = "Companies_id_gen", sequenceName = "Company_Id_seq", allocationSize = 1)
    @Column(name = "\"Id\"", nullable = false)
    private Integer id;

    @Column(name = "\"Name\"", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    @OneToMany(mappedBy = "company")
    private Set<Project> projects = new LinkedHashSet<>();

}