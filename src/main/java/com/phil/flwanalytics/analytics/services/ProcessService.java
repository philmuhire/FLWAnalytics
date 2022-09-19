package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.Payload.ProcessEditPayload;
import com.phil.flwanalytics.analytics.Payload.ProcessPayload;
import com.phil.flwanalytics.analytics.model.Process;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProcessService {
    void saveActivity(ProcessPayload processPayload);

    public void editActivity(ProcessEditPayload ape);

    List<Process> getAll();
}
