package com.phil.flwanalytics.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class ActivityReader {
    public static List<Activity> readBooksFromCSV(String fileName) {
        List<Activity> datalist = new ArrayList<>();
        Path pathToFile = Paths.get(fileName);
        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.UTF_8)) {
            String line = br.readLine();
            int index = 0;
            while (line != null) {

                String[] attributes = line.split(",");
                Activity myData = createData(attributes);
                if (index == 0) {
                    ++index;
                    line = br.readLine();
                    continue;
                } else {
                    datalist.add(myData);
                    line = br.readLine();
                }
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return datalist;
    }

    public static Activity createData(String[] metadata) {
        String name = metadata[0];
        String stage = metadata[1];
        if (name.startsWith("\""))
            name = name.substring(name.indexOf("\"") + 1);
        return new Activity(name, stage);
    }

}
