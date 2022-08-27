package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity(name = "activity")
@Table(name = "activity")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @NaturalId
    public String name;
    public String description;

    @OneToMany(
            mappedBy = "activity",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CropActivity> crops = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="stage_id", nullable=false)
    private Stage stage;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activity activity = (Activity) o;
        return name.equals(activity.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
