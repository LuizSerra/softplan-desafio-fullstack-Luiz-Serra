package com.softplan.core.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.softplan.core.model.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {
	
	List<Usuario> findByAtivoTrue();

}
