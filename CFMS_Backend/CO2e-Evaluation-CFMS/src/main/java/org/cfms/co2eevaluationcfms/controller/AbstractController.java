package org.cfms.co2eevaluationcfms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class AbstractController {

    protected ResponseEntity<Object> handleSuccessfulOkResponse(Object response) {
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    protected ResponseEntity<Object> handleSuccessfulCreatedResponse(Object response) {
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<HttpStatus> handleSuccessfulNoContentResponse(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    protected ResponseEntity<Object> handleClientErrorNotFoundResponse(Object response) {
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    protected ResponseEntity<Object> handleClientErrorBadRequestResponse(Object response) {
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    protected ResponseEntity<Object> handleClientErrorUnprocessableEntityResponse(Object response) {
        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

}
