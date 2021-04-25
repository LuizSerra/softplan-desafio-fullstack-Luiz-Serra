package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.softplan.core.model.Processo;
import com.softplan.core.repository.ProcessoRepository;

@Service
public class ProcessoService {

	@Autowired
	ProcessoRepository processoRepository;

	public List<Processo> getAllProcesses(Integer pageNo, Integer pageSize, String sortBy) {
		

		List<Processo> pagedResult = (List<Processo>) processoRepository.findAll();
		if (!pagedResult.isEmpty()) {
			return pagedResult;
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
	
	public Processo findById(Long id) {
		Processo processoAtualizado = processoRepository.findOne(id);
		if (processoAtualizado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return processoAtualizado;
	}

	

	
}
