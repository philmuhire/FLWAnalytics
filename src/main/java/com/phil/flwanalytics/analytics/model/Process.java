package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Process {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Column(unique = true, nullable = false)
    public String name;

    public String description;


    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;

    public Process(String name, String description, Stage stage) {
        this.name = name;
        this.description = description;
        this.stage = stage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Process process = (Process) o;
        return id == process.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
