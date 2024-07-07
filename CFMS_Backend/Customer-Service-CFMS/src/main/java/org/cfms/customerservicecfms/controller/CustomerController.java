package org.cfms.customerservicecfms.controller;

import jakarta.validation.Valid;
import org.cfms.customerservicecfms.dto.CustomerDTO;
import org.cfms.customerservicecfms.service.implementation.CustomerServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customers")
@CrossOrigin
public class CustomerController extends AbstractController{

    private CustomerServiceImple customerServiceImple;

    @Autowired
    public CustomerController(CustomerServiceImple customerServiceImple) {
        this.customerServiceImple = customerServiceImple;
    }

    @GetMapping
    public ResponseEntity<Object> getCustomers() {
        return handleSuccessfulOkResponse(customerServiceImple.getCustomers());
    }

    @PostMapping
    public ResponseEntity<Object> createCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        return handleSuccessfulCreatedResponse(customerServiceImple.createCustomer(customerDTO));
    }

    @GetMapping("{customerId}")
    public ResponseEntity<Object> getCustomerById(@PathVariable("customerId") Long customerId) {
        return handleSuccessfulOkResponse(customerServiceImple.getCustomerById(customerId));
    }

    @PutMapping("{customerId}")
    public ResponseEntity<Object> updateCustomer(@PathVariable("customerId") Long customerId, @Valid @RequestBody CustomerDTO customerDTO) {
        return handleSuccessfulOkResponse(customerServiceImple.updateCustomer(customerId, customerDTO));
    }

    @DeleteMapping("{customerId}")
    public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable("customerId") Long customerId) {
        customerServiceImple.deleteCustomer(customerId);
        return handleSuccessfulNoContentResponse();
    }

}
