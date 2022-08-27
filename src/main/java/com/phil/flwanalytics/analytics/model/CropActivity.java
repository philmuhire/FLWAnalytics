package com.phil.flwanalytics.analytics.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity(name = "CropActivity")
@Table(name = "crop_activity")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CropActivity {

    @EmbeddedId
    private CropActivityId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cropId")
    private Crop crop;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("activityId")
    private Activity activity;

    @ManyToOne(fetch = FetchType.EAGER)
    private Country country;

    private int year;
    private Double lossPercentage;
    private Double lossQuantity;
    private String causeOfLoss;
    private String treatment;



    public CropActivity(Crop crop, Activity activity) {
        this.crop = crop;
        this.activity = activity;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CropActivity that = (CropActivity) o;
        return crop.equals(that.crop) && activity.equals(that.activity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(crop, activity);
    }
}
