package com.phil.flwanalytics.analytics.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "FoodProcess")
@Table(name = "food_process")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FoodProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_process_id")
    public long id;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "process_id")
    private Process process;

    @ManyToOne
    private Country country;

    private int year;
    private Double lossPercentage;
    private Double produce;
    private Double lossQuantity;
    private String causeOfLoss;
    private String treatment;

    public FoodProcess(Food food, Process process, Country country, int year, Double produce, Double lossPercentage,  Double lossQuantity, String causeOfLoss, String treatment) {
        this.food = food;
        this.process = process;
        this.country = country;
        this.year = year;
        this.produce = produce;
        this.lossPercentage = lossPercentage;
        this.lossQuantity = lossQuantity;
        this.causeOfLoss = causeOfLoss;
        this.treatment = treatment;
    }

    public FoodProcess(Food food, Process process) {
        this.food = food;
        this.process = process;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FoodProcess that = (FoodProcess) o;
        return getId() == that.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "FoodProcess{" +
                "id=" + id +
                ", food=" + food.getName() +
                ", process=" + process.getName() +
                ", country=" + country.getName() +
                ", year=" + year +
                ", produce=" + produce +
                ", lossPercentage=" + lossPercentage +
                ", lossQuantity=" + lossQuantity +
                ", causeOfLoss='" + causeOfLoss + '\'' +
                ", treatment='" + treatment + '\'' +
                '}';
    }
}
