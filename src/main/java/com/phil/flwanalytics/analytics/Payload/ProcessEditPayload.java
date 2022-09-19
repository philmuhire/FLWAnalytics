package com.phil.flwanalytics.analytics.Payload;

import lombok.Data;

@Data
public class ProcessEditPayload {
    private Long id;
    private String name;
    private String description;
    private String stageId;
}
