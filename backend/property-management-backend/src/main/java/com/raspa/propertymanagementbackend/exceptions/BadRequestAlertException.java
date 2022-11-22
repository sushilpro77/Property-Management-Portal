package com.raspa.propertymanagementbackend.exceptions;

public class BadRequestAlertException extends RuntimeException {
    public BadRequestAlertException(String message) {
        super(message);
    }
}
