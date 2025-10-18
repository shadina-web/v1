package com.skillmitra.controller;

import com.skillmitra.model.User;
import com.skillmitra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "*")
public class WorkerController {

    @Autowired
    private UserService userService;

    /**
     * Get all workers (users with WORKER role who have skills)
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllWorkers() {
        List<User> allWorkers = userService.findAllWorkers();
        
        // Filter workers who have at least one skill
        List<User> workersWithSkills = allWorkers.stream()
            .filter(worker -> worker.getSkills() != null && !worker.getSkills().isEmpty())
            .collect(Collectors.toList());
        
        // Remove passwords before sending
        workersWithSkills.forEach(worker -> worker.setPassword(null));
        
        return ResponseEntity.ok(workersWithSkills);
    }

    /**
     * Get a specific worker by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getWorkerById(@PathVariable Long id) {
        User worker = userService.findById(id);
        
        if (worker == null || !"WORKER".equals(worker.getRole())) {
            return ResponseEntity.notFound().build();
        }
        
        // Remove password before sending
        worker.setPassword(null);
        
        return ResponseEntity.ok(worker);
    }
}
