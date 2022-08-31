package com.phil.flwanalytics;

import com.phil.flwanalytics.analytics.Repo.*;
import com.phil.flwanalytics.analytics.model.*;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.flwanalytics.authentication.domain.User;
import com.phil.flwanalytics.authentication.service.UserService;
import com.phil.flwanalytics.utils.*;
import lombok.Data;
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

@SpringBootApplication
@RequiredArgsConstructor
@Slf4j
public class FlwAnalyticsApplication {

    private final CountryRepo countryRepo;
    private final CropRepo cropRepo;
    private final StageRepo stageRepo;
    private final ActivityRepo activityRepo;
    private final CropActivityRepo cropActivityRepo;

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
            List<com.phil.flwanalytics.utils.Activity> activities = ActivityReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\activities.csv");
            List<MyData> crops = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\commodities.csv");
            List<MyData> countries = FileReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\countries.csv");

            List<CropAct> cropActList = CropActReader.readBooksFromCSV("C:\\Users\\philmuhire\\Documents\\cropactivity.csv");

            if(cropRepo.findAll().isEmpty()){
                log.info("adding crops");
                for(MyData data: crops){
//                    System.out.println(data.getName());
                    cropRepo.save(new Crop(data.getName(), null, QuantityUnit.KILOGRAM_kg));
                }
            }







            //adding crop-activity
            if(cropActivityRepo.findAll().isEmpty()){
                log.info("adding cropactivity");
                Crop crop;
                Country country;
                Activity activity;
                CropActivity cropActivity;
                for(CropAct data: cropActList){
                    try{
                        crop = cropRepo.getByName(data.getCrop());
                        country = countryRepo.findByName(data.getCountry());
                        activity = activityRepo.getByName(data.getActivity());
                    } catch (Exception ex){
                        log.error("while getting pojos: "+ex.getMessage());
                        continue;
                    }

                    try {
                        cropActivity = new CropActivity(crop, activity, country, data.getYear(), data.getLossPercentage(), data.getLossQuantity(), data.getCauseOfLoss(), data.getTreatment());
                        log.info("created data:"+cropActivity.toString());
                        cropActivityRepo.save(cropActivity);
                    } catch (Exception ex){
                        log.error("while saving activities "+ex.getMessage());
                        continue;
                    }
                }
            }











            if(activityRepo.findAll().isEmpty()){
                log.info("adding activities");
                Stage stage = null;
                for(com.phil.flwanalytics.utils.Activity data: activities){
//                    System.out.println(data.getName());
                    stage = stageRepo.getByName(data.getStage());
                    activityRepo.save(new Activity(data.getName(), null, stage));
                }
                log.info("finished adding activities");
            }


            if(stageRepo.findAll().isEmpty()){
//                log.info("adding crops");
//                for(MyData data: crops){
//                    cropRepo.save(new Crop(data.getName(), data.getName(), QuantityUnit.KILOGRAM_kg));
//                }
                log.info("adding stage");
                for(MyData data: stages){
                    stageRepo.save(new Stage(data.getName(), data.getName()));
                }
                log.info("adding countries");
                for(MyData data: countries){
                    countryRepo.save(new Country(data.getName(), null));
                }
                log.info("finished adding read data");
            }

            if (userService.getUsers().isEmpty()) {


                userService.saveRole(new Role(null, "ROLE_SYS_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_USER"));

                Country country = new Country("wakanda", "Sub sahara");
                countryRepo.save(country);

                userService.saveUser(new User(null, "John Travolta", "john", "1234", new ArrayList<>(), country));
                userService.saveUser(new User(null, "Will Smith", "will", "1234", new ArrayList<>(), country));
                userService.saveUser(new User(null, "Jim Carry", "jim", "1234", new ArrayList<>(), country));
                userService.saveUser(
                        new User(null, "Arnold Schwarzenegger", "arnold", "1234", new ArrayList<>(), country));

                userService.addRoleToUser("john", "ROLE_CTR_USER");
                userService.addRoleToUser("will", "ROLE_CTR_ADMIN");
                userService.addRoleToUser("jim", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_CTR_USER");
            } else {
                log.info("Sample data has already been initialized");
            }


        };
    }

}
