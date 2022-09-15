package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.FoodProcess;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FoodPagination extends PagingAndSortingRepository<FoodProcess, Long> {
//    List<FoodProcess> findAllByActivityNotNull(Pageable pageable);
}
