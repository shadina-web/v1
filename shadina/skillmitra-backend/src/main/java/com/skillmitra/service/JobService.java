package com.skillmitra.service;

import com.skillmitra.model.Job;
import com.skillmitra.model.Skill;
import com.skillmitra.model.User;
import com.skillmitra.repository.JobRepository;
import com.skillmitra.repository.SkillRepository;
import com.skillmitra.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository, SkillRepository skillRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public Job createJob(Job job, Long postedById, Long skillId) {
        User user = userRepository.findById(postedById).orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));
        job.setPostedBy(user);
        job.setSkillRequired(skill);
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job update, Long skillId) {
        Job existing = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setLocation(update.getLocation());
        if (skillId != null) {
            Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));
            existing.setSkillRequired(skill);
        }
        return jobRepository.save(existing);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public Job getJob(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public List<Job> listAll() {
        return jobRepository.findAll();
    }

    public List<Job> findByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Job> findBySkill(Long skillId) {
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));
        return jobRepository.findBySkillRequired(skill);
    }
}
