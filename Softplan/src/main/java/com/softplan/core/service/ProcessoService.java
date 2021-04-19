package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.softplan.core.model.Processo;
import com.softplan.core.repository.ProcessoRepository;

@Service
public class ProcessoService {

	@Autowired
	ProcessoRepository processoRepository;

	public List<Processo> getAllProcesses(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

		Page<Processo> pagedResult = processoRepository.findAll(paging);
		if (pagedResult.hasContent()) {
			return pagedResult.getContent();
		} else {
			return new ArrayList<Processo>();
		}
	}
	
	public Processo create(Processo Processo) {
		return processoRepository.save(Processo);
	}
	
	public Processo update(Long id, Processo Processo) {
		Processo processoEncontrado = findById(id);

		BeanUtils.copyProperties(Processo, processoEncontrado, "id");
		return processoRepository.save(processoEncontrado);
	}

	public void delete(Long id) {
		Processo processoEncontrado = findById(id);
		if (processoEncontrado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		processoRepository.delete(processoEncontrado);
	}
	
	private Processo findById(Long id) {
		Optional<Processo> processoAtualizado = processoRepository.findById(id);
		if (processoAtualizado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return processoAtualizado.get();
	}

	

	
}
