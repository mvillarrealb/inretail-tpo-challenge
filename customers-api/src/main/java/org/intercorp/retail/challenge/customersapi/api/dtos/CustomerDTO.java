package org.intercorp.retail.challenge.customersapi.api.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.use_cases.CustomerKpiUseCase;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class CustomerDTO {
    @NotNull(message = "Nombre del cliente es requerido")
    @NotBlank(message = "Nombre del cliente es requerido")
    private String name;

    @NotNull(message = "Apellido del cliente es requerido")
    @NotBlank(message = "Apellido del cliente es requerido")
    private String lastName;

    @NotNull(message = "Fecha de nacimiento es requerido")
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate birthDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate probableDeathDate;

    private int age;

    /**
     *
     * @param customer
     * @return
     */
    public static CustomerDTO toCustomerDTO(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setName(customer.getName());
        customerDTO.setLastName(customer.getLastName());
        customerDTO.setBirthDate(customer.getBirthDate());
        customerDTO.setAge(CustomerKpiUseCase.getAge(customer.getBirthDate(), LocalDate.now()));
        customerDTO.setProbableDeathDate(CustomerKpiUseCase.probableDeathDate(customerDTO.getAge()));
        return customerDTO;
    }

    /**
     *
     * @param customerDTO
     * @return
     */
    public static Customer toCustomer(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setName(customerDTO.getName());
        customer.setLastName(customerDTO.getLastName());
        customer.setBirthDate(customerDTO.getBirthDate());
        return customer;
    }
}
