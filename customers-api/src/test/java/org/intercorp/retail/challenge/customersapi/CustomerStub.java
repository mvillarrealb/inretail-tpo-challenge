package org.intercorp.retail.challenge.customersapi;

import org.intercorp.retail.challenge.customersapi.api.dtos.CustomerDTO;
import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CustomerStub {
    public static Customer mockCustomer() {
        Customer customer = new Customer();
        customer.setId(1);
        customer.setName("Marco");
        customer.setLastName("Villarreal");
        customer.setBirthDate(LocalDate.of(1989, Month.SEPTEMBER, 11));
        return customer;
    }

    public static List<CustomerDTO> fetchMockCustomersDTO() {
        return fetchMockCustomers().stream().map(CustomerDTO::toCustomerDTO).collect(Collectors.toList());
    }
    public static List<Customer> fetchMockCustomers() {
        List<Customer> customerList = new ArrayList<>();
        Customer customer = new Customer();
        customer.setId(1);
        customer.setName("Marco");
        customer.setLastName("Villarreal");
        customer.setBirthDate(LocalDate.of(1989, Month.SEPTEMBER, 11));
        customerList.add(customer);
        return customerList;
    }

    public static CustomerDTO mockCustomerDTO() {
        return CustomerDTO.toCustomerDTO(mockCustomer());
    }

    public static CustomerKpi mockCustomerKpi() {
        CustomerKpi customerKpi = new CustomerKpi();
        customerKpi.setAgeAverage(30);
        customerKpi.setAgeStandardDeviation(10);
        return customerKpi;
    }
}
