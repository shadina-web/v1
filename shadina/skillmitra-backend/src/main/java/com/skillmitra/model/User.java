package com.skillmitra.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String password; // stored encrypted

    @Column(nullable = false)
    private String role; // "WORKER" or "EMPLOYER"

    @Column(name = "preferred_language")
    private String preferredLanguage; // "en", "hi", "ml"

    @Column
    private String location; // village/city

    @Column(length = 1000)
    private String bio; // user bio/description

    @Column
    private String avatar; // profile picture URL

    @ElementCollection
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "skill")
    private List<String> skills; // skills offered

    @ElementCollection
    @CollectionTable(name = "user_interests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "interest")
    private List<String> interests; // services needed
    
    public User() {
    }

    public User(Long id, String name, String email, String phone, String password, String role, 
                String preferredLanguage, String location, String bio, String avatar, 
                List<String> skills, List<String> interests) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "en";
        this.location = location;
        this.bio = bio;
        this.avatar = avatar;
        this.skills = skills;
        this.interests = interests;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getInterests() {
        return interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    // Builder replacement
    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String password;
        private String role;
        private String preferredLanguage;
        private String location;
        private String bio;
        private String avatar;
        private List<String> skills;
        private List<String> interests;

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserBuilder preferredLanguage(String preferredLanguage) {
            this.preferredLanguage = preferredLanguage;
            return this;
        }

        public UserBuilder location(String location) {
            this.location = location;
            return this;
        }

        public UserBuilder bio(String bio) {
            this.bio = bio;
            return this;
        }

        public UserBuilder avatar(String avatar) {
            this.avatar = avatar;
            return this;
        }

        public UserBuilder skills(List<String> skills) {
            this.skills = skills;
            return this;
        }

        public UserBuilder interests(List<String> interests) {
            this.interests = interests;
            return this;
        }

        public User build() {
            return new User(id, name, email, phone, password, role, preferredLanguage, 
                           location, bio, avatar, skills, interests);
        }
    }
}
