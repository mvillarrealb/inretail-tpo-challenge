package org.intercorp.retail.challenge.customersapi;

import org.intercorp.retail.challenge.customersapi.api.controllers.CustomerController;
import org.intercorp.retail.challenge.customersapi.api.dtos.CustomerDTO;
import org.intercorp.retail.challenge.customersapi.api.services.CustomerService;
import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;
import org.intercorp.retail.challenge.customersapi.domain.repositories.CustomerRepository;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class ApplicationTests {
	@InjectMocks
	private CustomerController customerController;

	@Mock
	private CustomerService customerService;
	@Test
	public void main() {
		/**
		 * Silly coverage of main method :D
		 */
		Application.main(new String[] {});
	}
	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void listCustomersTest() {
		List<CustomerDTO> customerDTOS = CustomerStub.fetchMockCustomersDTO();
		when(customerService.listCustomers(10, 0)).thenReturn(customerDTOS);
		List<CustomerDTO> actual = customerController.listCustomers(Optional.of(10), Optional.of(0));
		assertEquals(customerDTOS, actual);
		assertEquals(customerDTOS.size(), actual.size());
	}

	@Test
	public void createCustomerTest() {
		CustomerDTO customerDTO = CustomerStub.mockCustomerDTO();
		when(customerService.createCustomer(Mockito.any(CustomerDTO.class))).thenReturn(customerDTO);
		assertEquals(customerDTO, customerController.createCustomer(customerDTO));
	}

	@Test
	public void listKpiTest() {
		CustomerKpi customerKpi = CustomerStub.mockCustomerKpi();
		when(customerService.getCustomerKpi()).thenReturn(customerKpi);
		assertEquals(customerKpi, customerController.getCustomerKpi());
	}


}
