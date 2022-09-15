package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.Payload.ProcessPayload;
import com.phil.flwanalytics.analytics.model.Process;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProcessService {
    Process saveActivity(ProcessPayload processPayload);
    List<Process> getAll();
}
