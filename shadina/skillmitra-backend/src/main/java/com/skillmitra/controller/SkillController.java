package com.skillmitra.controller;

import com.skillmitra.dto.SkillDto;
import com.skillmitra.model.Skill;
import com.skillmitra.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillDto> create(@Valid @RequestBody SkillDto dto) {
        Skill saved = skillService.createSkill(Skill.builder().skillName(dto.getSkillName()).description(dto.getDescription()).build());
        dto.setId(saved.getId());
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> list() {
        List<SkillDto> all = skillService.listAll().stream().map(s -> new SkillDto(s.getId(), s.getSkillName(), s.getDescription())).collect(Collectors.toList());
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillDto> get(@PathVariable Long id) {
        Skill s = skillService.getSkill(id);
        return ResponseEntity.ok(new SkillDto(s.getId(), s.getSkillName(), s.getDescription()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillDto> update(@PathVariable Long id, @Valid @RequestBody SkillDto dto) {
        Skill updated = skillService.updateSkill(id, Skill.builder().skillName(dto.getSkillName()).description(dto.getDescription()).build());
        return ResponseEntity.ok(new SkillDto(updated.getId(), updated.getSkillName(), updated.getDescription()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
