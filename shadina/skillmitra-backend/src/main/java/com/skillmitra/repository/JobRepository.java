package com.skillmitra.repository;

import com.skillmitra.model.Job;
import com.skillmitra.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByLocationContainingIgnoreCase(String location);
    List<Job> findBySkillRequired(Skill skill);
}
