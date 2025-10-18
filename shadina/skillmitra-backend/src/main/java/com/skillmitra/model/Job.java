package com.skillmitra.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String location;

    // User who posted the job
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by_id", nullable = false)
    private User postedBy;

    // Required skill
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skillRequired;

    public Job() {
    }

    public Job(Long id, String title, String description, String location, User postedBy, Skill skillRequired) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.postedBy = postedBy;
        this.skillRequired = skillRequired;
    }

    public static JobBuilder builder() {
        return new JobBuilder();
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

    public User getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(User postedBy) {
        this.postedBy = postedBy;
    }

    public Skill getSkillRequired() {
        return skillRequired;
    }

    public void setSkillRequired(Skill skillRequired) {
        this.skillRequired = skillRequired;
    }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String description;
        private String location;
        private User postedBy;
        private Skill skillRequired;

        JobBuilder() {
        }

        public JobBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public JobBuilder title(String title) {
            this.title = title;
            return this;
        }

        public JobBuilder description(String description) {
            this.description = description;
            return this;
        }

        public JobBuilder location(String location) {
            this.location = location;
            return this;
        }

        public JobBuilder postedBy(User postedBy) {
            this.postedBy = postedBy;
            return this;
        }

        public JobBuilder skillRequired(Skill skillRequired) {
            this.skillRequired = skillRequired;
            return this;
        }

        public Job build() {
            return new Job(id, title, description, location, postedBy, skillRequired);
        }
    }
}
