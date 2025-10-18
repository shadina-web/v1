package com.skillmitra.service;

import com.skillmitra.model.Skill;
import com.skillmitra.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long id, Skill update) {
        Skill existing = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Skill not found"));
        existing.setSkillName(update.getSkillName());
        existing.setDescription(update.getDescription());
        return skillRepository.save(existing);
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    public Skill getSkill(Long id) {
        return skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    public List<Skill> listAll() {
        return skillRepository.findAll();
    }
}
