package com.skillmitra.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class LanguagePreferenceRequest {
    
    @NotBlank(message = "Language code is required")
    @Pattern(regexp = "^(en|hi|ml)$", message = "Language must be one of: en, hi, ml")
    private String languageCode;

    public LanguagePreferenceRequest() {
    }

    public LanguagePreferenceRequest(String languageCode) {
        this.languageCode = languageCode;
    }

    public String getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(String languageCode) {
        this.languageCode = languageCode;
    }
}
