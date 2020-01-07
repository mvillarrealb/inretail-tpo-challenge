package org.intercorp.retail.challenge.customersapi.api.services;

import org.intercorp.retail.challenge.customersapi.api.dtos.CustomerDTO;
import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;
import org.intercorp.retail.challenge.customersapi.domain.repositories.CustomerRepository;
import org.intercorp.retail.challenge.customersapi.domain.use_cases.CustomerKpiUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerKpiUseCase customerKpiUseCase;

    @Override
    public List<CustomerDTO> listCustomers(int limit, int offset) {
        Pageable pageable = PageRequest.of(0, limit);
        return customerRepository.findAll(pageable)
                .stream()
                .map(CustomerDTO::toCustomerDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = CustomerDTO.toCustomer(customerDTO);
        Customer persistent = customerRepository.save(customer);
        return CustomerDTO.toCustomerDTO(persistent);
    }

    @Override
    public CustomerKpi getCustomerKpi() {
        List<Customer> customerList = customerRepository.findAll();
        return customerKpiUseCase.computeKpi(customerList, LocalDate.now());
    }
}
