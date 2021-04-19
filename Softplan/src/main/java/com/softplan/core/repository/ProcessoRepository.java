package com.softplan.core.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.softplan.core.model.Processo;

public interface ProcessoRepository extends PagingAndSortingRepository<Processo, Long> {
	
}
