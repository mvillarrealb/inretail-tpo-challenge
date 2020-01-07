package org.intercorp.retail.challenge.customersapi;

import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.use_cases.CustomerKpiUseCase;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

public class CustomerKpiUseCaseTest {
    @Test
    void computeAgeTest() {
        LocalDate testDate = LocalDate.of(2020, Month.JANUARY, 6);
        LocalDate localDate = LocalDate.of(1989, Month.SEPTEMBER, 11);
        LocalDate localDateb = LocalDate.of(1995, Month.JANUARY, 15);
        assertEquals(CustomerKpiUseCase.getAge(localDate, testDate), 30);
        assertEquals(CustomerKpiUseCase.getAge(localDateb, testDate), 24);
    }
    @Test
    void getAgesArrayTest() {
        CustomerKpiUseCase customerKpi = new CustomerKpiUseCase();
        List<Integer> ages = customerKpi.getAges(customerListFixture(), LocalDate.now());
        List<Integer> expected = new ArrayList<>();
        expected.add(29);
        expected.add(29);
        expected.add(30);
        expected.add(30);
        expected.add(26);
        assertEquals(ages, expected);
    }
    @Test
    void sumAgesTest() {
        CustomerKpiUseCase customerKpi = new CustomerKpiUseCase();
        double ageSum = customerKpi.sumAges(customerListFixture(), LocalDate.of(2020, Month.JANUARY, 6));
        assertEquals(ageSum, 144);
    }

    List<Customer> customerListFixture() {
        List<Customer> customers = new ArrayList<>();
        Customer customer = new Customer();
        /**
         * AGE 29
         */
        customer.setBirthDate(LocalDate.of(1990, Month.SEPTEMBER, 11));
        customers.add(customer);
        /**
         * AGE 29
         */
        customer = new Customer();
        customer.setBirthDate(LocalDate.of(1990, Month.FEBRUARY, 14));
        customers.add(customer);
        /**
         * AGE 30
         */
        customer = new Customer();
        customer.setBirthDate(LocalDate.of(1989, Month.OCTOBER, 31));
        customers.add(customer);
        /**
         * AGE 30
         */
        customer = new Customer();
        customer.setBirthDate(LocalDate.of(1989, Month.JUNE, 16));
        customers.add(customer);
        /**
         * AGE 26
         */
        customer = new Customer();
        customer.setBirthDate(LocalDate.of(1993, Month.AUGUST, 14));
        customers.add(customer);

        return customers;
    }
    @Test
    void calculateAgeAverageTest() {
        CustomerKpiUseCase customerKpi = new CustomerKpiUseCase();
        double average = customerKpi.calculateAverage(customerListFixture(), LocalDate.of(2020, Month.JANUARY, 6));
        assertEquals(average, 28.8);
    }

    @Test
    void calculateAgeStandardDeviation() {
        CustomerKpiUseCase customerKpi = new CustomerKpiUseCase();
        double standardDeviation = customerKpi.calculateStdDev(customerListFixture(), LocalDate.of(2020, Month.JANUARY, 6));
        assertEquals(standardDeviation, 1.469693845669907);
    }
}
