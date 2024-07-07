package org.cfms.customerservicecfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.customerservicecfms.dto.CustomerDTO;
import org.cfms.customerservicecfms.entity.Customer;
import org.cfms.customerservicecfms.exception.CustomerNotFoundException;
import org.cfms.customerservicecfms.repository.CustomerRepository;
import org.cfms.customerservicecfms.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImple implements CustomerService {

    private CustomerRepository customerRepository;

    private ModelMapper modelMapper;

    @Autowired
    public CustomerServiceImple(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }


    public List<CustomerDTO> getCustomers() {

        return customerRepository.findAll().stream()
                .map(customer -> modelMapper.map(customer, CustomerDTO.class))
                .toList();

    }

    @Transactional
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {

        Customer customer = Customer.builder()
                .customerName(customerDTO.getCustomerName().toUpperCase())
                .location(customerDTO.getLocation())
                .distanceFromWarehouse(customerDTO.getDistanceFromWarehouse())
                .build();

        customerRepository.save(customer);

        return modelMapper.map(customer, CustomerDTO.class);

    }

    public CustomerDTO getCustomerById(Long customerId) {

        return customerRepository.findById(customerId)
                .map(customer -> modelMapper.map(customer, CustomerDTO.class))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with Id : " + customerId));

    }

    @Transactional
    public CustomerDTO updateCustomer(Long customerId, CustomerDTO customerDTO) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id : " + customerId));
        customer.setCustomerName(customerDTO.getCustomerName().toUpperCase());
        customer.setLocation(customerDTO.getLocation());
        customer.setDistanceFromWarehouse(customerDTO.getDistanceFromWarehouse());
        customerRepository.save(customer);
        return modelMapper.map(customer, CustomerDTO.class);
    }

    public void deleteCustomer(Long customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new CustomerNotFoundException("Customer not found with id : " + customerId);
        }
        customerRepository.deleteById(customerId);
    }

}
