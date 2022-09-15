package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Payload.ProcessPayload;
import com.phil.flwanalytics.analytics.Repo.ProcessRepo;
import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Process;
import com.phil.flwanalytics.analytics.model.Stage;
import com.phil.flwanalytics.analytics.services.ProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProcessServiceImpl implements ProcessService {
    private final ProcessRepo processRepo;
    private final StageRepo stageRepo;

    @Override
    public Process saveActivity(ProcessPayload ap) {
        Stage stage = stageRepo.getById(Long.parseLong(ap.getStageId()));
        Process process = new Process(ap.getName(), ap.getDescription(), stage);
        System.out.println(process.getStage().getName());
        return processRepo.save(process);
    }

    @Override
    public List<Process> getAll() {
        return processRepo.findAll();
    }
}
