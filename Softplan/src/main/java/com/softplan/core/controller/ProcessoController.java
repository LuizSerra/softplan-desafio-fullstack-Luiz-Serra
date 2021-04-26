package com.softplan.core.controller;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.softplan.core.model.Processo;
import com.softplan.core.repository.ProcessoRepository;
import com.softplan.core.service.ProcessoService;

@RestController
@RequestMapping("/processos")
public class ProcessoController {
	
	@Autowired
	ProcessoService processoService;
	
	@Autowired
	ProcessoRepository processoRepository;
	
	@PreAuthorize("hasAnyAuthority('ADM', 'FINALIZADOR', 'TRIADOR')")
	@GetMapping
    public ResponseEntity<List<Processo>> getAllUsers(
                        @RequestParam(defaultValue = "0") Integer pageNo, 
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy) 
    {
        List<Processo> processos = processoService.getAllProcesses(pageNo, pageSize, sortBy);
 
        return !processos.isEmpty() ? ResponseEntity.ok(processos) : ResponseEntity.noContent().build();
    }
	
	@PreAuthorize("hasAnyAuthority('ADM', 'FINALIZADOR', 'TRIADOR')")
	@GetMapping("/{id}")
    public ResponseEntity<Processo> getByID(@PathVariable Long id) 
    {
		Processo processoEncontrado = processoService.findById(id);
		return processoEncontrado != null ? ResponseEntity.ok().body(processoEncontrado) : ResponseEntity.notFound().build();
    }
	
	@PreAuthorize("hasAnyAuthority('ADM', 'TRIADOR')")
	@PostMapping
	public ResponseEntity<Processo> criar(@Valid @RequestBody Processo processo, HttpServletResponse response) {
		
		Processo processoCriado = processoService.create(processo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(processoCriado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(processoCriado);
	}
	@PreAuthorize("hasAnyAuthority('ADM', 'TRIADOR')")
	@PutMapping("/{id}")
	public ResponseEntity<Processo> atualizar(@PathVariable Long id, @Valid @RequestBody Processo processo, HttpServletResponse response) {
		Processo processoAtualizado = processoService.update(id, processo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(processoAtualizado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(processoAtualizado);
	}
	
	@PreAuthorize("hasAnyAuthority('ADM')")
	@DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id){
		processoService.delete(id);
		
	}
    

}
