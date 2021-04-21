package com.softplan.core.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.softplan.core.model.Usuario;

public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {
	
	List<Usuario> findByAtivoTrue();
    Optional<Usuario> findByEmail(String email);

}
