package org.student.microserviceapp.javaservice.services.company;

import org.springframework.stereotype.Service;
import org.student.microserviceapp.javaservice.repositories.CompanyRepository;

@Service
public class CompanyService implements ICompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
}
