package com.raspa.propertymanagementbackend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.raspa.propertymanagementbackend.configs.CloudinaryConfig;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.Random;

@Service
public class CloudinaryService {

    @Autowired
    CloudinaryConfig cloudinaryConfig;
    Random random = new Random();

    public String upload(MultipartFile multipartFile) throws Exception {
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();

        FileOutputStream fos = new FileOutputStream(file);

        fos.write(multipartFile.getBytes());
        fos.close();

        Cloudinary cloudinary = cloudinaryConfig.getCloudinary();

        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        file.delete();
        return uploadResult.get("public_id").toString();
    }

    public String upload(MultipartFile multipartFile, String fileName) throws Exception {
        Map params = ObjectUtils.asMap(
                "public_id", fileName,
                "overwrite", true,
                "resource_type", "auto",
                "invalidate", true
        );

//        TODO Don't store file locally
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();

        FileOutputStream fos = new FileOutputStream(file);

        fos.write(multipartFile.getBytes());
        fos.close();

        Cloudinary cloudinary = cloudinaryConfig.getCloudinary();

        Map uploadResult = cloudinary.uploader().upload(file, params);
        file.delete();
        return "https://res.cloudinary.com/dhuw5guix/image/upload/v1664574354/" + uploadResult.get("public_id").toString();
    }

    public void remove(String filePath) throws Exception{
        Cloudinary cloudinary = cloudinaryConfig.getCloudinary();
        cloudinary.uploader().destroy(filePath, ObjectUtils.emptyMap());
    }

    public String uploadWithIdAndName(Long id, String directory, String name, MultipartFile image) {
        DateFormat df = new SimpleDateFormat("yyMMdd_HHmmss");
        String dateAsString = df.format(Calendar.getInstance().getTime());
        try {
            return upload(image, directory + "/" + id + "-" + name.replaceAll("\\s", "_").replaceAll("[^a-zA-Z0-9]","") + "_" + dateAsString + "_" + random.nextInt());
        } catch (Exception e) {
            throw new BadRequestAlertException("INVALID IMAGE!");
        }
    }
}
