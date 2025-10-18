package com.skillmitra.model;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String status; // e.g., PENDING, ACCEPTED, REJECTED

    public Application() {
    }

    public Application(Long id, Job job, User user, String status) {
        this.id = id;
        this.job = job;
        this.user = user;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Builder replacement
    public static ApplicationBuilder builder() {
        return new ApplicationBuilder();
    }

    public static class ApplicationBuilder {
        private Long id;
        private Job job;
        private User user;
        private String status;

        public ApplicationBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ApplicationBuilder job(Job job) {
            this.job = job;
            return this;
        }

        public ApplicationBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ApplicationBuilder status(String status) {
            this.status = status;
            return this;
        }

        public Application build() {
            return new Application(id, job, user, status);
        }
    }
}
