package com.skillmitra.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillDto {
    private Long id;

    @NotBlank
    private String skillName;

    private String description;

    public SkillDto() {
    }

    public SkillDto(Long id, String skillName, String description) {
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

    public static SkillDtoBuilder builder() {
        return new SkillDtoBuilder();
    }

    public static class SkillDtoBuilder {
        private Long id;
        private String skillName;
        private String description;

        SkillDtoBuilder() {
        }

        public SkillDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public SkillDtoBuilder skillName(String skillName) {
            this.skillName = skillName;
            return this;
        }

        public SkillDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public SkillDto build() {
            return new SkillDto(id, skillName, description);
        }
    }
}
