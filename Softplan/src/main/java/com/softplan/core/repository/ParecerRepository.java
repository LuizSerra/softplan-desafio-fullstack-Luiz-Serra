package com.softplan.core.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.softplan.core.model.Parecer;
import com.softplan.core.model.Parecer.Id;
import com.softplan.core.model.Processo;
import com.softplan.core.model.Usuario;

public interface ParecerRepository extends PagingAndSortingRepository<Parecer, Id> {
	
	List<Parecer> findByUsuario(Usuario usuario);
	List<Parecer> findByProcesso(Processo processo);
}
