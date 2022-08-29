package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Column(unique = true, nullable = false)
    public String name;

    public String description;

//    @OneToMany(
//            mappedBy = "activity"
//
//    )
//    private List<CropActivity> cropActivityList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;

    public Activity(String name, String description, Stage stage) {
        this.name = name;
        this.description = description;
        this.stage = stage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activity activity = (Activity) o;
        return id == activity.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
