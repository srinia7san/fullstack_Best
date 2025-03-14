package com.contractanalysis.repository;

import com.contractanalysis.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    // Basic CRUD operations are provided by JpaRepository
    // You can add custom query methods if needed
}