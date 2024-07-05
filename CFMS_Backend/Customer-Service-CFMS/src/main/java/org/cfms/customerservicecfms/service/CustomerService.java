package org.cfms.customerservicecfms.service;

import org.cfms.customerservicecfms.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    List<CustomerDTO> getCustomers();

    CustomerDTO createCustomer(CustomerDTO customerDTO);

    CustomerDTO getCustomerById(Long customerId);


}
