package com.phil.flwanalytics.analytics.model;

//import com.phil.flwanalytics.authentication.model.User;
import com.phil.flwanalytics.authentication.domain.User;
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
public class Country {
    @Id
    private String name;
    private String region;



//    @OneToMany(
//            mappedBy = "country"
//    )
//    private List<FoodProcess> cropActivityList = new ArrayList<>();
//    @OneToMany(
//            mappedBy = "country"
//    )
//    private List<User> user = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Country country = (Country) o;
        return Objects.equals(name, country.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
