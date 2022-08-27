package com.phil.flwanalytics.analytics.model;

import com.phil.flwanalytics.authentication.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country {
    @Id
    private String name;
    private String region;

    public Country(String name, String region) {
        this.name = name;
        this.region = region;
    }

    @OneToMany(
            mappedBy = "country",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CropActivity> activities = new ArrayList<>();
    @OneToMany(
            mappedBy = "country",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<User> user = new ArrayList<>();
}
