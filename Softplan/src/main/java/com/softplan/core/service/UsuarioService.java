package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.softplan.core.model.Usuario;
import com.softplan.core.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public List<Usuario> getAllUsers(Integer pageNo, Integer pageSize, String sortBy) {
		
		List<Usuario> pagedResult = (List<Usuario>) usuarioRepository.findAll();
		if (!pagedResult.isEmpty()) {
			return pagedResult;
		} else {
			return new ArrayList<Usuario>();
		}
	}
	
	public List<Usuario> getAllUsersActive(Integer pageNo, Integer pageSize, String sortBy) {
		
		List<Usuario> pagedResult = usuarioRepository.findByAtivoTrue();
		
		if (!pagedResult.isEmpty()) {
			return pagedResult;
		} else {
			return new ArrayList<Usuario>();
		}
	}

	public Usuario create(Usuario usuario) {
		BCryptPasswordEncoder enconder =  new BCryptPasswordEncoder();
		usuario.setAtivo(true);
		usuario.setSenha(enconder.encode(usuario.getSenha()));
		return usuarioRepository.save(usuario);
	}
	
	public Usuario update(Long id, Usuario usuario) {
		Usuario usuarioEncontrado = findById(id);

		BeanUtils.copyProperties(usuario, usuarioEncontrado, "id");
		return usuarioRepository.save(usuarioEncontrado);
	}

	public void delete(Long id) {
		Usuario usuarioEncontrado = findById(id);
		if (usuarioEncontrado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		usuarioRepository.delete(usuarioEncontrado);
	}
	
	public Usuario updateStatus(Long id, boolean ativo) {
		Usuario usuarioEncontrado = usuarioRepository.findOne(id);
		if (usuarioEncontrado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		Usuario usuario = usuarioEncontrado;
		usuario.setAtivo(ativo);
		usuario = usuarioRepository.save(usuario);
		return usuario;
		
	}

	private Usuario findById(Long id) {
		Usuario usuarioAtualizado = usuarioRepository.findOne(id);
		if (usuarioAtualizado == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return usuarioAtualizado;
	}

	

	
}
