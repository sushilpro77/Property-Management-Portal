package com.raspa.propertymanagementbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl {

    private final MailSender mailSender;

    public void sendMessage(SimpleMailMessage simpleMailMessage){
        this.mailSender.send(simpleMailMessage);
    }

    public void sendMessage(String to, String propertyName) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("abc2017x@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject("Application for your Property.");
        simpleMailMessage.setText("Your property : " + propertyName + "has an application. Please login to the system to find the details.");
        sendMessage(simpleMailMessage);
    }
}
