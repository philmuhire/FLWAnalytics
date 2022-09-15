package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Food")
@Table(name = "food")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    @Column(unique = true, nullable = false)
    public String name;
    public String description;


    @Enumerated(EnumType.STRING)
    public QuantityUnit quantityUnit;

    public Food(String name, String description, QuantityUnit quantityUnit) {
        this.name = name;
        this.description = description;
        this.quantityUnit = quantityUnit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Food food = (Food) o;
        return getId() == food.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
