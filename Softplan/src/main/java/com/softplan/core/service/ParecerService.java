package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
		List<Parecer> pagedResult = (List<Parecer>) parecerRepository.findAll();
		if (!pagedResult.isEmpty()) {
			return pagedResult;
		} else {
			return new ArrayList<Parecer>();
		}
	}
	
	
	
	public Parecer create(Parecer parecer) {
		return parecerRepository.save(parecer);
	}
	
	public Parecer update(Id id, Parecer parecer) {
		Parecer parecerEncontrado = findOne(id);

		BeanUtils.copyProperties(parecer, parecerEncontrado, "id");
		return parecerRepository.save(parecerEncontrado);
	}

	public void delete(Id id) {
		Parecer processoEncontrado = findOne(id);
		if (processoEncontrado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		parecerRepository.delete(processoEncontrado);
	}
	
	public Parecer findOne(Id id) {
		Parecer parecerAtualizado = parecerRepository.findOne(id);
		if (parecerAtualizado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return parecerAtualizado;
	}

	public List<Parecer> getAllByUsers(Long idUsuario) {
		Usuario usuario =  usuarioRepository.findOne(idUsuario);
		List<Parecer> result = parecerRepository.findByUsuario(usuario);
		if (!result.isEmpty()) {
			return result;
		} else {
			return new ArrayList<Parecer>();
		}
	}

	public List<Parecer> getAllByProcess(Long idProcesso) {
		Processo processo =  processoRepository.findOne(idProcesso);
		List<Parecer> result = parecerRepository.findByProcesso(processo);
		if (!result.isEmpty()) {
			return result;
		} else {
			return new ArrayList<Parecer>();
		}
	}

	
}
