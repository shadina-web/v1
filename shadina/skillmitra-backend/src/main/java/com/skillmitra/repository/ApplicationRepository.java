package com.skillmitra.repository;

import com.skillmitra.model.Application;
import com.skillmitra.model.Job;
import com.skillmitra.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);
    List<Application> findByJob(Job job);
    Optional<Application> findByJobAndUser(Job job, User user);
}
