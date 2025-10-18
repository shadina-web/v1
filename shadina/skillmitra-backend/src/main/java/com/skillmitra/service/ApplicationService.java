package com.skillmitra.service;

import com.skillmitra.model.Application;
import com.skillmitra.model.Job;
import com.skillmitra.model.User;
import com.skillmitra.repository.ApplicationRepository;
import com.skillmitra.repository.JobRepository;
import com.skillmitra.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Application apply(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (applicationRepository.findByJobAndUser(job, user).isPresent()) {
            throw new RuntimeException("Already applied");
        }
        Application app = Application.builder().job(job).user(user).status("PENDING").build();
        return applicationRepository.save(app);
    }

    public List<Application> getByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByUser(user);
    }

    public List<Application> getByJob(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        return applicationRepository.findByJob(job);
    }

    public Application updateStatus(Long applicationId, String status) {
        Application app = applicationRepository.findById(applicationId).orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
