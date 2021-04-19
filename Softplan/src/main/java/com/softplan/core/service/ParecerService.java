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

import com.softplan.core.model.Parecer;
import com.softplan.core.model.Parecer.Id;
import com.softplan.core.model.Processo;
import com.softplan.core.model.Usuario;
import com.softplan.core.repository.ParecerRepository;
import com.softplan.core.repository.ProcessoRepository;
import com.softplan.core.repository.UsuarioRepository;

@Service
public class ParecerService {

	@Autowired
	ParecerRepository parecerRepository;
	
	@Autowired
    UsuarioRepository usuarioRepository;
	
	@Autowired
    ProcessoRepository processoRepository;

	public List<Parecer> getAll(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

		Page<Parecer> pagedResult = parecerRepository.findAll(paging);
		if (pagedResult.hasContent()) {
			return pagedResult.getContent();
		} else {
			return new ArrayList<Parecer>();
		}
	}
	
	
	
	public Parecer create(Parecer parecer) {
		return parecerRepository.save(parecer);
	}
	
	public Parecer update(Id id, Parecer parecer) {
		Parecer parecerEncontrado = findById(id);

		BeanUtils.copyProperties(parecer, parecerEncontrado, "id");
		return parecerRepository.save(parecerEncontrado);
	}

	public void delete(Id id) {
		Parecer processoEncontrado = findById(id);
		if (processoEncontrado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		parecerRepository.delete(processoEncontrado);
	}
	
	private Parecer findById(Id id) {
		Optional<Parecer> parecerAtualizado = parecerRepository.findById(id);
		if (parecerAtualizado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return parecerAtualizado.get();
	}

	public List<Parecer> getAllByUsers(Long idUsuario) {
		Usuario usuario =  usuarioRepository.findById(idUsuario).get();
		List<Parecer> result = parecerRepository.findByUsuario(usuario);
		if (!result.isEmpty()) {
			return result;
		} else {
			return new ArrayList<Parecer>();
		}
	}

	public List<Parecer> getAllByProcess(Long idProcesso) {
		Processo processo =  processoRepository.findById(idProcesso).get();
		List<Parecer> result = parecerRepository.findByProcesso(processo);
		if (!result.isEmpty()) {
			return result;
		} else {
			return new ArrayList<Parecer>();
		}
	}

	
}
