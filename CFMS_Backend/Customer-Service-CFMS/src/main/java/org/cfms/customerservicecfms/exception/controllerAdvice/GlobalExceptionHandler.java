package org.cfms.customerservicecfms.exception.controllerAdvice;

import org.cfms.customerservicecfms.controller.AbstractController;
import org.cfms.customerservicecfms.exception.CustomerNotFoundException;
import org.cfms.customerservicecfms.exception.model.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends AbstractController {

    private final String ERROR = "errors";

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<Object> handleVehicleNotFoundException(CustomerNotFoundException ex) {

        Map<String, List<ErrorResponse>> errors = new HashMap<>();
        errors.put(ERROR, Collections.singletonList(new ErrorResponse(ex.getMessage())));

        return handleClientErrorNotFoundResponse(errors);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {

        Map<String, List<ErrorResponse>> errors = new HashMap<>();
        errors.put(ERROR, Collections.singletonList(new ErrorResponse(ex.getMessage())));

        return handleClientErrorBadRequestResponse(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {

        String detailedMessage = ex.getMessage();
        String userFriendlyMessage = null;

        // Deserialization errors
        if (detailedMessage.contains("Cannot deserialize value of type")) {
            userFriendlyMessage = "Invalid value provided for fields. Please ensure all fields have correct values.";

        // JSON Syntax error
        } else if (detailedMessage.contains("Unexpected character") || detailedMessage.contains("Unexpected end-of-input")) {
            userFriendlyMessage = "Malformed JSON request. Please check the JSON syntax.";

        // Unrecognized Fields error
        } else if (detailedMessage.contains("Unrecognized field")) {
            String fieldName = extractFieldName(detailedMessage);
            userFriendlyMessage = String.format("Unrecognized field '%s' in the JSON request.", fieldName);
        }

        // Creating a HashMap to store Errors
        Map<String, List<ErrorResponse>> errors = new HashMap<>();

        if (userFriendlyMessage == null){
            errors.put(ERROR, Collections.singletonList(new ErrorResponse(ex.getMessage())));
        } else {
            errors.put(ERROR, Collections.singletonList(new ErrorResponse(userFriendlyMessage)));
        }

        return handleClientErrorBadRequestResponse(errors);
    }

    private String extractFieldName(String detailedMessage) {
        int startIndex = detailedMessage.indexOf("field ") + "field ".length();
        int endIndex = detailedMessage.indexOf(" ", startIndex);
        return detailedMessage.substring(startIndex, endIndex);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

        Map<String, List<ErrorResponse>> errors = new HashMap<>();
        errors.put(ERROR, ex.getBindingResult().getAllErrors().stream()
                .map(error -> new ErrorResponse(((FieldError)error).getField() + " : " + error.getDefaultMessage()))
                .toList());

        return handleClientErrorUnprocessableEntityResponse(errors);
    }

}
