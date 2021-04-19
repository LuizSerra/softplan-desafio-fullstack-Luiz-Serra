package com.softplan.core.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.softplan.core.model.Parecer;
import com.softplan.core.model.Parecer.Id;

public interface ParecerRepository extends PagingAndSortingRepository<Parecer, Id> {
	
	

}
