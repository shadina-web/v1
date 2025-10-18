package com.skillmitra.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobDto {
    private Long id;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String location;

    @NotNull
    private Long skillId;

    private Long postedById;

    public JobDto() {
    }

    public JobDto(Long id, String title, String description, String location, Long skillId, Long postedById) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.skillId = skillId;
        this.postedById = postedById;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public Long getPostedById() {
        return postedById;
    }

    public void setPostedById(Long postedById) {
        this.postedById = postedById;
    }

    // Builder replacement
    public static JobDtoBuilder builder() {
        return new JobDtoBuilder();
    }

    public static class JobDtoBuilder {
        private Long id;
        private String title;
        private String description;
        private String location;
        private Long skillId;
        private Long postedById;

        public JobDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public JobDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public JobDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public JobDtoBuilder location(String location) {
            this.location = location;
            return this;
        }

        public JobDtoBuilder skillId(Long skillId) {
            this.skillId = skillId;
            return this;
        }

        public JobDtoBuilder postedById(Long postedById) {
            this.postedById = postedById;
            return this;
        }

        public JobDto build() {
            return new JobDto(id, title, description, location, skillId, postedById);
        }
    }
}
