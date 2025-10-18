package com.skillmitra.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // WORKER or EMPLOYER

    private String preferredLanguage; // Optional: en, hi, ml (defaults to 'en')

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

    public RegisterRequest() {
    }

    public RegisterRequest(String name, String email, String phone, String password, String role, String preferredLanguage) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.preferredLanguage = preferredLanguage;
    }

    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static class RegisterRequestBuilder {
        private String name;
        private String email;
        private String phone;
        private String password;
        private String role;
        private String preferredLanguage;

        RegisterRequestBuilder() {
        }

        public RegisterRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public RegisterRequestBuilder email(String email) {
            this.email = email;
            return this;
        }

        public RegisterRequestBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public RegisterRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequestBuilder role(String role) {
            this.role = role;
            return this;
        }

        public RegisterRequestBuilder preferredLanguage(String preferredLanguage) {
            this.preferredLanguage = preferredLanguage;
            return this;
        }

        public RegisterRequest build() {
            return new RegisterRequest(name, email, phone, password, role, preferredLanguage);
        }
    }
}
