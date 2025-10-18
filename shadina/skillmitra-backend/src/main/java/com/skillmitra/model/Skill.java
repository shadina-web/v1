package com.skillmitra.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String skillName;

    @Column(length = 1000)
    private String description;

    public Skill() {
    }

    public Skill(Long id, String skillName, String description) {
        this.id = id;
        this.skillName = skillName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Builder replacement
    public static SkillBuilder builder() {
        return new SkillBuilder();
    }

    public static class SkillBuilder {
        private Long id;
        private String skillName;
        private String description;

        public SkillBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public SkillBuilder skillName(String skillName) {
            this.skillName = skillName;
            return this;
        }

        public SkillBuilder description(String description) {
            this.description = description;
            return this;
        }

        public Skill build() {
            return new Skill(id, skillName, description);
        }
    }
}
