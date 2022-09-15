package com.phil.flwanalytics;

import com.phil.flwanalytics.analytics.Repo.*;
import com.phil.flwanalytics.analytics.model.*;
import com.phil.flwanalytics.analytics.model.Process;
import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.flwanalytics.authentication.domain.User;
import com.phil.flwanalytics.authentication.service.UserService;
import com.phil.flwanalytics.utils.*;
import com.phil.flwanalytics.utils.FoodProcess;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@RequiredArgsConstructor
@Slf4j
public class FlwAnalyticsApplication {

    private final CountryRepo countryRepo;
    private final FoodRepo foodRepo;
    private final StageRepo stageRepo;
    private final ProcessRepo processRepo;
    private final FoodProcessRepo foodProcessRepo;

    public static void main(String[] args) {

        SpringApplication.run(FlwAnalyticsApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {

            log.info("reading data from files");
            List<MyData> causes = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\cause.csv");
            List<MyData> treatments = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\treatment.csv");
            List<MyData> stages = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\stage.csv");
            List<com.phil.flwanalytics.utils.Process> processes = ActivityReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\activities.csv");
            List<MyData> foods = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\commodities.csv");
            List<MyData> countries = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\countries.csv");

            List<FoodProcess> foodProcessList = FoodProcessReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\cropactivity.csv");

            if(foodRepo.findAll().isEmpty()){
                log.info("adding crops");
                for(MyData data: foods){
//                    System.out.println(data.getName());
                    foodRepo.save(new Food(data.getName(), null, QuantityUnit.KILOGRAM_kg));
                }
            }







//            adding food-process
            if(foodProcessRepo.findAll().isEmpty()){
                log.info("adding cropactivity");
                Food food;
                Country country;
                Process process;
                com.phil.flwanalytics.analytics.model.FoodProcess foodProcess;
                Random r = new Random();
                int low = 100;
                int high = 2000;
                for(FoodProcess data: foodProcessList){
                    int lossQuan = r.nextInt(high-low) + low;
                    try{
                        food = foodRepo.getByName(data.getCrop());
                        country = countryRepo.findByName(data.getCountry());
                        process = processRepo.getByName(data.getActivity());
                    } catch (Exception ex){
                        log.error("while getting pojos: "+ex.getMessage());
                        continue;
                    }

                    try {
                        foodProcess = new com.phil.flwanalytics.analytics.model.FoodProcess(food, process, country, data.getYear(), lossQuan/(data.getLossPercentage()/100), data.getLossPercentage(), lossQuan*1.0, data.getCauseOfLoss(), data.getTreatment());
                        log.info("created data:"+ foodProcess.toString());
                        foodProcessRepo.save(foodProcess);
                    } catch (Exception ex){
                        log.error("while saving activities "+ex.getMessage());
                        continue;
                    }
                }
            }











            if(processRepo.findAll().isEmpty()){
                log.info("adding processes");
                Stage stage = null;
                for(com.phil.flwanalytics.utils.Process data: processes){
//                    System.out.println(data.getName());
                    stage = stageRepo.getByName(data.getStage());
                    processRepo.save(new Process(data.getName(), null, stage));
                }
                log.info("finished adding processes");
            }


            if(stageRepo.findAll().isEmpty()){
                log.info("adding stage");
                for(MyData data: stages){
                    stageRepo.save(new Stage(data.getName(), data.getName()));
                }
                log.info("adding countries");
                for(MyData data: countries){
                    countryRepo.save(new Country(data.getName(), null));
                }
                log.info("finished adding stage and country read data");
            }

            if (userService.getUsers().isEmpty()) {


                userService.saveRole(new Role(null, "ROLE_SYS_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_USER"));

                Country country = new Country("wakanda", "Sub sahara");
                countryRepo.save(country);

                userService.saveUser(new User(null, "Murenzi","jack", "jack@gmail.com", "Jack123@1", new ArrayList<>(), country));
                userService.saveUser(new User(null, "KAYISIRE", "Christian", "krissie@gmail.com", "Chris123@1", new ArrayList<>(), country));
                userService.saveUser(new User(null, "ISIMBI", "Sonia","isonia@gmail.com", "Sonia123@1", new ArrayList<>(), country));


                userService.addRoleToUser("isonia@gmail.com", "ROLE_CTR_USER");
                userService.addRoleToUser("krissie@gmail.com", "ROLE_CTR_ADMIN");
                userService.addRoleToUser("jack@gmail.com", "ROLE_SYS_ADMIN");

            } else {
                log.info("Sample data has already been initialized");
            }


        };
    }

}
