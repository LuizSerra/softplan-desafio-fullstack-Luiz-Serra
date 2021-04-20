package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softplan.core.model.Permissao;
import com.softplan.core.repository.PermissaoRepository;

@Service
public class PermissaoService {

	@Autowired
    PermissaoRepository permissaoRepository;
     
    public List<Permissao> getAllPermissons(Integer pageNo, Integer pageSize, String sortBy)
    {
       List<Permissao> pagedResult = (List<Permissao>) permissaoRepository.findAll();
         
       if (!pagedResult.isEmpty()) {
			return pagedResult;
		} else {
			return new ArrayList<Permissao>();
		}
    }
}
