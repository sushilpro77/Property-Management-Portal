package com.raspa.propertymanagementbackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        ApiException apiException = new ApiException(
                e.getMessage(),
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {InvalidPasswordException.class})
    public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException e){
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        ApiException apiException = new ApiException(
                e.getMessage(),
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {UsernameAlreadyUsedException.class, EmailAlreadyUsedException.class})
    public ResponseEntity<Object> handleUsernameOrEmailUsedException(RuntimeException e){
        String errorField;
        if(e instanceof UsernameAlreadyUsedException){
            errorField = "username";
        } else {
            errorField = "email";
        }

        HttpStatus httpStatus = HttpStatus.CONFLICT;
        ApiException apiException = new ApiException(
                e.getMessage(),
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z")),
                errorField
        );
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {BadRequestAlertException.class})
    public ResponseEntity<ApiException> badRequestException(RuntimeException e){
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        ApiException apiException = new ApiException(
                e.getMessage(),
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    class ApiException {
        private String message;
        private HttpStatus httpStatus;
        private ZonedDateTime zonedDateTime;
        private String errorField;

        public ApiException(String message, HttpStatus httpStatus, ZonedDateTime zonedDateTime) {
            this.message = message;
            this.httpStatus = httpStatus;
            this.zonedDateTime = zonedDateTime;
        }
    }
}

