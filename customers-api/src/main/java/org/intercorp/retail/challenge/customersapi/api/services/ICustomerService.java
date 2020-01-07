package org.intercorp.retail.challenge.customersapi.api.services;

import org.intercorp.retail.challenge.customersapi.api.dtos.CustomerDTO;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;

import java.util.List;

public interface ICustomerService {
    List<CustomerDTO> listCustomers(int limit, int offset);
    CustomerDTO createCustomer(CustomerDTO customerDTO);
    CustomerKpi getCustomerKpi();
}
