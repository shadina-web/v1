package com.skillmitra.controller;

import com.skillmitra.model.Application;
import com.skillmitra.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<Application> apply(@RequestParam Long jobId, @RequestParam Long userId) {
        Application created = applicationService.apply(jobId, userId);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<Application>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getByUser(userId));
    }

    @GetMapping("/by-job/{jobId}")
    public ResponseEntity<List<Application>> byJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getByJob(jobId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long applicationId, @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateStatus(applicationId, status));
    }
}
