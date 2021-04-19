package com.softplan.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.softplan.core.model.Permissao;
import com.softplan.core.repository.PermissaoRepository;

@Service
public class PermissaoService {

	@Autowired
    PermissaoRepository permissaoRepository;
     
    public List<Permissao> getAllPermissons(Integer pageNo, Integer pageSize, String sortBy)
    {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
 
        Page<Permissao> pagedResult = permissaoRepository.findAll(paging);
         
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Permissao>();
        }
    }
}
