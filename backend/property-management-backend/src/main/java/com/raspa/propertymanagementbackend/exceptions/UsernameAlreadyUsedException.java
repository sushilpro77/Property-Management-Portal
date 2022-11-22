package com.raspa.propertymanagementbackend.exceptions;

public class UsernameAlreadyUsedException extends RuntimeException {
    public UsernameAlreadyUsedException() {
        super("Username Already Used");
    }

}
