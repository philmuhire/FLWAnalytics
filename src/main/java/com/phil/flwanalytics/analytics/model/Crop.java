package com.phil.flwanalytics.analytics.model;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Entity(name = "crop")
@Table(name = "crop")
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    public String name;
    public String description;

    @OneToMany(
            mappedBy = "crop",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CropActivity> activities = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    public QuantityUnit quantityUnit;

    public void addActivity(Activity activity) {
        CropActivity cropActivity = new CropActivity(this, activity);
        activities.add(cropActivity);
        activity.getCrops().add(cropActivity);
    }

    public void removeActivity(Activity activity) {
        for (Iterator<CropActivity> iterator = activities.iterator();
             iterator.hasNext(); ) {
            CropActivity cropActivity = iterator.next();

            if (cropActivity.getCrop().equals(this) &&
                    cropActivity.getActivity().equals(activity)) {
                iterator.remove();
                cropActivity.getActivity().getCrops().remove(cropActivity);
                cropActivity.setCrop(null);
                cropActivity.setActivity(null);
            }
        }
    }


}
