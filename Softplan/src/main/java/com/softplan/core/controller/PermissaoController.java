package com.softplan.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.softplan.core.model.Permissao;
import com.softplan.core.service.PermissaoService;

@RestController
@RequestMapping(path = "/permissoes")
public class PermissaoController {
	
	@Autowired
	PermissaoService permissaoService;

	@GetMapping
    public ResponseEntity<List<Permissao>> getAllpermissions(
                        @RequestParam(defaultValue = "0") Integer pageNo, 
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy) 
    {
        List<Permissao> permissoes = permissaoService.getAllPermissons(pageNo, pageSize, sortBy);
 
        return !permissoes.isEmpty() ? ResponseEntity.ok(permissoes) : ResponseEntity.noContent().build();
    }
	
	
}
