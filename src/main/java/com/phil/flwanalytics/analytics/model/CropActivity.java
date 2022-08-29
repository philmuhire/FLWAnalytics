package com.phil.flwanalytics.analytics.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "CropActivity")
@Table(name = "crop_activity")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CropActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_activity_id")
    public long id;

    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @ManyToOne
    private Country country;

    private int year;
    private Double lossPercentage;
    private Double lossQuantity;
    private String causeOfLoss;
    private String treatment;

    public CropActivity(Crop crop, Activity activity, Country country, int year, Double lossPercentage, Double lossQuantity, String causeOfLoss, String treatment) {
        this.crop = crop;
        this.activity = activity;
        this.country = country;
        this.year = year;
        this.lossPercentage = lossPercentage;
        this.lossQuantity = lossQuantity;
        this.causeOfLoss = causeOfLoss;
        this.treatment = treatment;
    }

    public CropActivity(Crop crop, Activity activity) {
        this.crop = crop;
        this.activity = activity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CropActivity that = (CropActivity) o;
        return getId() == that.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
