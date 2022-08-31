package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;

    public Stage(String name, String description) {
        this.name = name;
        this.description = description;
    }
//    @OneToMany(mappedBy="stage")
//    private Set<Activity> activitySet  = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stage stage = (Stage) o;
        return Objects.equals(getId(), stage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
