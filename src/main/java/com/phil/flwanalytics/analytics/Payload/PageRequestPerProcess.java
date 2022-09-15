package com.phil.flwanalytics.analytics.Payload;

import lombok.Data;

@Data
public class PageRequestPerProcess {
    private Long id;
    private Integer page;
    private Integer size;
}
