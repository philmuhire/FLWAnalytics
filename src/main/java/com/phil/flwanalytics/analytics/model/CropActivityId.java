package com.phil.flwanalytics.analytics.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CropActivityId implements Serializable  {
    @Column(name = "crop_id")
    private Long cropId;

    @Column(name = "activity_id")
    private Long activityId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CropActivityId that = (CropActivityId) o;
        return cropId.equals(that.cropId) && activityId.equals(that.activityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cropId, activityId);
    }
}
