package com.raspa.propertymanagementbackend.exceptions;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException() {
        super("Email Already Used");
    }
}
