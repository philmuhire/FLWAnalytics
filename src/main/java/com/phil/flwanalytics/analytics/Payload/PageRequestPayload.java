package com.phil.flwanalytics.analytics.Payload;

import lombok.Data;

@Data
public class PageRequestPayload {
    private Integer page;
    private Integer size;
}
