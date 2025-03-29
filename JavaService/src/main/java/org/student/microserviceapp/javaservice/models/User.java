package org.student.microserviceapp.javaservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "\"Users\"", schema = "public", indexes = {
        @Index(name = "IX_Users_Username", columnList = "Username", unique = true)
})
public class User {
    @Id
    @Column(name = "\"Id\"", nullable = false)
    private UUID id;

    @Column(name = "\"Username\"", nullable = false, length = Integer.MAX_VALUE)
    private String username;

    @Column(name = "\"PasswordHash\"", nullable = false, length = Integer.MAX_VALUE)
    private String passwordHash;

    @Column(name = "\"Role\"", nullable = false, length = Integer.MAX_VALUE)
    private String role;

    @Column(name = "\"RefreshToken\"", length = Integer.MAX_VALUE)
    private String refreshToken;

    @Column(name = "\"RefreshTokenExpiryTime\"")
    private OffsetDateTime refreshTokenExpiryTime;

    @Column(name = "\"Avatar\"", length = Integer.MAX_VALUE)
    private String avatar;

    @ColumnDefault("''")
    @Column(name = "\"PasswordSalt\"", nullable = false, length = Integer.MAX_VALUE)
    private String passwordSalt;

    @OneToMany(mappedBy = "manager")
    private Set<Sprint> sprints = new LinkedHashSet<>();

    @OneToMany(mappedBy = "developer")
    private Set<Task> tasks = new LinkedHashSet<>();

}