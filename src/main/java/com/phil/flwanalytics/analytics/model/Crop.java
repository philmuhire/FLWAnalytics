package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Entity(name = "crop")
@Table(name = "crop")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    @Column(unique = true, nullable = false)
    public String name;
    public String description;

//    @OneToMany(
//            mappedBy = "crop"
//    )
//    private List<CropActivity> cropActivityList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    public QuantityUnit quantityUnit;

    public Crop(String name, String description, QuantityUnit quantityUnit) {
        this.name = name;
        this.description = description;
        this.quantityUnit = quantityUnit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Crop crop = (Crop) o;
        return getId() == crop.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
