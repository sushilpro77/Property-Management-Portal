package com.raspa.propertymanagementbackend.configs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dhuw5guix",
            "api_key", "461987481738574",
            "api_secret", "7yT0yGEEJw53p9Rb_2c_2MSuTYc"));

    public Cloudinary getCloudinary() {
        return cloudinary;
    }

    public void setCloudinary(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }
}


