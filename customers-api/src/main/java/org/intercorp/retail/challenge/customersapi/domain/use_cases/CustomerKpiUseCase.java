package org.intercorp.retail.challenge.customersapi.domain.use_cases;

import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.intercorp.retail.challenge.customersapi.domain.models.CustomerKpi;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * @author mvillarreal
 */
@Service
public class CustomerKpiUseCase {
    /**
     * Create a probable death date based on an age
     * takes a random age from 70 - 105 years then
     * computes the distance in years between booth
     * last but not least returns the current date
     * plus the years neccessary to the probable death date
     * @param age
     * @return
     */
    public static LocalDate probableDeathDate(int age) {
        int[] deathRange = { 70, 75, 80, 85, 90, 95, 100, 105 };
        Random Dice = new Random();
        int index = Dice.nextInt(deathRange.length);
        int ageOfDeath = deathRange[index];
        int necessaryAge = ageOfDeath - age;
        LocalDate now = LocalDate.now();
        return now.plusYears(necessaryAge);
    }

    /**
     * Computes customer kpi
     * @param customerList
     * @return
     */
    public CustomerKpi computeKpi(List<Customer> customerList, LocalDate calculateFrom) {
        double average = calculateAverage(customerList, calculateFrom);
        double standardDeviation = calculateStdDev(customerList, calculateFrom);
        CustomerKpi customerKpi = new CustomerKpi();
        customerKpi.setAgeAverage(average);
        customerKpi.setAgeStandardDeviation(standardDeviation);
        return customerKpi;
    }

    /**
     * Compute the age of a given date
     * @param birthDate
     * @return
     */
    public static int getAge(LocalDate birthDate, LocalDate calculateFrom) {
        return  Period.between(birthDate, calculateFrom).getYears();
    }
    public List<Integer> getAges(List<Customer> customersList, LocalDate calculateFrom) {
        return customersList
                .stream()
                .map(customer -> getAge(customer.getBirthDate(), calculateFrom))
                .collect(Collectors.toList());
    }

    public double sumAges(List<Customer> customersList, LocalDate calculateFrom) {
        return getAges(customersList, calculateFrom).stream().reduce(0, Integer::sum);
    }

    /**
     * Calculate standard deviation of customers
     * @param customersList
     * @return
     */
    public double calculateStdDev(List<Customer> customersList, LocalDate calculateFrom) {
        List<Integer> agesList = getAges(customersList, calculateFrom);
        int customerListLength = customersList.size();
        double average = calculateAverage(customersList, calculateFrom);
        double standardDeviation = agesList.stream()
                                           .map(it -> Math.pow((it - average), 2))
                                           .reduce(0.0, Double::sum);
        double divided = standardDeviation/customerListLength;
        return Math.sqrt(divided);
    }

    /**
     * Calculate the average of customer ages
     * @param customersList List of customers used to compute age average
     * @param calculateFrom The date from wich the date calculation will be performed
     * @return the average of ages
     */
    public double calculateAverage(List<Customer> customersList, LocalDate calculateFrom) {
        double ages = sumAges(customersList, calculateFrom);
        return ages / customersList.size();
    }

}
