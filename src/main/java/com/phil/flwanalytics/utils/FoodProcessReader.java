package com.phil.flwanalytics.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class FoodProcessReader {
    public static List<FoodProcess> readBooksFromCSV(String fileName) {
        List<FoodProcess> datalist = new ArrayList<>();
        Path pathToFile = Paths.get(fileName);
        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.UTF_8)) {
            String line = br.readLine();
            int index = 0;
            while (line != null) {
                if (index == 0) {
                    ++index;
                    line = br.readLine();
                    continue;
                } else {
                    String[] attributes = line.split(",");
                    FoodProcess myData = createData(attributes);
                    datalist.add(myData);
                    line = br.readLine();
                }
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return datalist;
    }

    public static FoodProcess createData(String[] metadata) {
        String country = metadata[0];
        String crop = metadata[1];
        String activity = metadata[2];
        Integer year = Integer.parseInt(metadata[3]);
        Double lossPercentage = Double.parseDouble(metadata[4]);
        Double lossQuantity = Double.parseDouble(metadata[5]);
        String treatment = metadata[6];;
        String causeOfLoss = metadata[7];
//        try{
//            lossQuantity = Double.parseDouble(metadata[5]);
//        } catch (Exception exception){
////            log.error("quantity : "+exception.getMessage());
//        }
//        try{
//            treatment = metadata[6];
//        } catch (Exception exception){
////            log.error("treatment : "+exception.getMessage());
//        }
//        try{
//            causeOfLoss = metadata[7];
//        } catch (Exception exception){
////            log.error("cause : "+exception.getMessage());
//        }
//        if (name.startsWith("\""))
//            name = name.substring(name.indexOf("\"") + 1);
        return new FoodProcess(country, crop, activity, year, lossPercentage, lossQuantity, treatment, causeOfLoss);
    }
}
