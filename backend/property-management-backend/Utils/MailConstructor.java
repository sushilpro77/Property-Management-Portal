package com.gyawalibros.teachernepal.Utils;

import com.gyawalibros.teachernepal.Domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Component
public class MailConstructor {

    private final Logger log = LoggerFactory.getLogger(MailConstructor.class);


    @Autowired
    private Environment env;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private MessageSource messageSource;

//    @Autowired
//    private JavaMailSender mailSender;

    String baseUrl = "http://localhost:3000";

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        try {
//            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
//            message.setTo(to);
//            message.setSubject(subject);
//            message.setText(content, isHtml);
//            mailSender.send(mimeMessage);
//        }  catch (MailException | MessagingException e) {
//            log.warn("Email could not be sent to user '{}'", to, e);
//        }
    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
//        if (user.getEmail() == null) {
//            log.debug("Email doesn't exist for user '{}'", user.getEmail());
//            return;
//        }
//        Locale locale = Locale.forLanguageTag("en");
//        Context context = new Context(locale);
//        context.setVariable("user", user);
//        context.setVariable("baseUrl", baseUrl);
//        String content = templateEngine.process(templateName, context);
//        String subject = messageSource.getMessage(titleKey, null, locale);
//        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendPasswordResetMail(User user) {
//        log.debug("Sending password reset email to '{}'", user.getEmail());
//        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }
}
