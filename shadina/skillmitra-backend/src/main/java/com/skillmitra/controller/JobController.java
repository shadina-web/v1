package com.skillmitra.controller;

import com.skillmitra.dto.JobDto;
import com.skillmitra.model.Job;
import com.skillmitra.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<JobDto> create(@Valid @RequestBody JobDto dto) {
        Job j = Job.builder().title(dto.getTitle()).description(dto.getDescription()).location(dto.getLocation()).build();
        Job saved = jobService.createJob(j, dto.getPostedById(), dto.getSkillId());
        dto.setId(saved.getId());
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> list() {
        List<JobDto> list = jobService.listAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(toDto(jobService.getJob(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDto> update(@PathVariable Long id, @Valid @RequestBody JobDto dto) {
        Job update = Job.builder().title(dto.getTitle()).description(dto.getDescription()).location(dto.getLocation()).build();
        Job saved = jobService.updateJob(id, update, dto.getSkillId());
        return ResponseEntity.ok(toDto(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobDto>> search(@RequestParam(required = false) String location, @RequestParam(required = false) Long skillId) {
        List<Job> jobs;
        if (skillId != null) jobs = jobService.findBySkill(skillId);
        else if (location != null && !location.isBlank()) jobs = jobService.findByLocation(location);
        else jobs = jobService.listAll();
        List<JobDto> dtos = jobs.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private JobDto toDto(Job j) {
        return JobDto.builder()
                .id(j.getId())
                .title(j.getTitle())
                .description(j.getDescription())
                .location(j.getLocation())
                .skillId(j.getSkillRequired().getId())
                .postedById(j.getPostedBy().getId())
                .build();
    }
}
