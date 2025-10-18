package com.skillmitra;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.skillmitra.model.Skill;
import com.skillmitra.model.User;
import com.skillmitra.repository.SkillRepository;
import com.skillmitra.repository.UserRepository;

@Configuration
public class DataLoader {

    @Bean
    @SuppressWarnings("unused") // Add this line to suppress the warning
    public CommandLineRunner init(SkillRepository skillRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (skillRepository.count() == 0) {
                Skill plumbing = new Skill(null, "Plumbing", "Plumbing services");
                Skill carpentry = new Skill(null, "Carpentry", "Woodwork and carpentry");
                Skill electrical = new Skill(null, "Electrical", "Electrical repairs");
                skillRepository.save(plumbing);
                skillRepository.save(carpentry);
                skillRepository.save(electrical);
            }

            if (userRepository.count() == 0) {
                User admin = new User(null, "Admin Employer", "employer@example.com", 
                    "9999999999", passwordEncoder.encode("password"), "EMPLOYER", "en",
                    null, null, null, null, null);
                userRepository.save(admin);
                
                // Test user for Saniya
                User saniya = new User(null, "Saniya Khan", "saniya@gmail.com", 
                    "9876543210", passwordEncoder.encode("saniya123"), "WORKER", "en",
                    null, null, null, null, null);
                userRepository.save(saniya);
            }
        };
    }
}