package org.intercorp.retail.challenge.customersapi.domain.repositories;

import org.intercorp.retail.challenge.customersapi.domain.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
