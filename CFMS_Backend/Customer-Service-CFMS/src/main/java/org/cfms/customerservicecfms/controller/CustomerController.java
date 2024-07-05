package org.cfms.customerservicecfms.controller;

import org.cfms.customerservicecfms.dto.CustomerDTO;
import org.cfms.customerservicecfms.service.implementation.CustomerServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
@CrossOrigin
public class CustomerController {

    private CustomerServiceImple customerServiceImple;

    @Autowired
    public CustomerController(CustomerServiceImple customerServiceImple) {
        this.customerServiceImple = customerServiceImple;
    }

    @GetMapping
    public List<CustomerDTO> getCustomers() {
        return customerServiceImple.getCustomers();
    }

    @PostMapping
    public CustomerDTO createCustomer(@RequestBody CustomerDTO customerDTO) {
        return customerServiceImple.createCustomer(customerDTO);
    }

    @GetMapping("{customerId}")
    public CustomerDTO getCustomerById(@PathVariable("customerId") Long customerId) {
        return customerServiceImple.getCustomerById(customerId);
    }

    @PutMapping("{customerId}")
    public CustomerDTO updateCustomer(@PathVariable("customerId") Long customerId, @RequestBody CustomerDTO customerDTO) {
        return customerServiceImple.updateCustomer(customerId, customerDTO);
    }

    @DeleteMapping("{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Long customerId) {
        customerServiceImple.deleteCustomer(customerId);
    }

}
