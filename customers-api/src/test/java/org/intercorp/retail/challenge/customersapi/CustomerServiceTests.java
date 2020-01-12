package org.intercorp.retail.challenge.customersapi;

import org.intercorp.retail.challenge.customersapi.api.dtos.CustomerDTO;
import org.intercorp.retail.challenge.customersapi.api.services.CustomerService;
import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;
import org.intercorp.retail.challenge.customersapi.domain.repositories.CustomerRepository;
import org.intercorp.retail.challenge.customersapi.domain.use_cases.CustomerKpiUseCase;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerServiceTests {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerKpiUseCase customerKpiUseCase;

    @Mock
    private CustomerRepository customerRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testFindCustomers() {
        List<CustomerDTO> customerList = CustomerStub.fetchMockCustomers()
                .stream()
                .map(CustomerDTO::toCustomerDTO)
                .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(0, 10);

        Page<Customer> pagedTasks = new PageImpl(CustomerStub.fetchMockCustomers());

        when(customerRepository.findAll(pageable)).thenReturn(pagedTasks);
        List<CustomerDTO> invocationResult = customerService.listCustomers(10, 0);
        CustomerDTO expected = customerList.get(0);
        CustomerDTO actual = invocationResult.get(0);
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getLastName(), actual.getLastName());
        assertEquals(expected.getBirthDate(), actual.getBirthDate());
        assertEquals(expected.getAge(), actual.getAge());
        assertEquals(customerList.size(),invocationResult.size());
    }

    @Test
    void testCreateCustomer() {
        Customer customer = CustomerStub.mockCustomer();
        CustomerDTO customerDTO = CustomerDTO.toCustomerDTO(customer);
        when(customerRepository.save(Mockito.any(Customer.class))).thenReturn(customer);
        CustomerDTO actual = customerService.createCustomer(customerDTO);

        assertEquals(customerDTO.getName(), actual.getName());
        assertEquals(customerDTO.getLastName(), actual.getLastName());
        assertEquals(customerDTO.getBirthDate(), actual.getBirthDate());
        assertEquals(customerDTO.getAge(), actual.getAge());
        assertNotNull(customerDTO.getProbableDeathDate());
    }

    @Test
    void testFetchKpis() {
        CustomerKpi customerKpi = CustomerStub.mockCustomerKpi();
        List<Customer> customerList = CustomerStub.fetchMockCustomers();
        when(customerRepository.findAll()).thenReturn(customerList);
        when(customerKpiUseCase.computeKpi(customerList, LocalDate.now()))
                               .thenReturn(customerKpi);
        CustomerKpi actual = customerService.getCustomerKpi();
        assertEquals(customerKpi.getAgeAverage(), actual.getAgeAverage());
        assertEquals(customerKpi.getAgeStandardDeviation(), actual.getAgeStandardDeviation());
    }

}
