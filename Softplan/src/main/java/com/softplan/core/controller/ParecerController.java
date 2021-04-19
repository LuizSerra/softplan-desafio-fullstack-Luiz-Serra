package com.softplan.core.controller;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.softplan.core.model.Parecer;
import com.softplan.core.model.Parecer.Id;
import com.softplan.core.repository.ParecerRepository;
import com.softplan.core.service.ParecerService;

@RestController
@RequestMapping("/pareceres")
public class ParecerController {
	
	@Autowired
	ParecerService parecerService;
	
	@Autowired
	ParecerRepository parecerRepository;
	
	
	@GetMapping
    public ResponseEntity<List<Parecer>> getAllUsers(
                        @RequestParam(defaultValue = "0") Integer pageNo, 
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy) 
    {
        List<Parecer> pareceres = parecerService.getAll(pageNo, pageSize, sortBy);
 
        return !pareceres.isEmpty() ? ResponseEntity.ok(pareceres) : ResponseEntity.noContent().build();
    }
	
		
	@PostMapping
	public ResponseEntity<Parecer> criar(@Valid @RequestBody Parecer parecer, HttpServletResponse response) {
		
		Parecer processoCriado = parecerService.create(parecer);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(processoCriado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(processoCriado);
	}
	
	@PutMapping("/{idUsuario}/{idProcesso}")
	public ResponseEntity<Parecer> atualizar(@PathVariable Long idUsuario, @PathVariable Long idProcesso,  @Valid @RequestBody Parecer parecer, HttpServletResponse response) {
		Id compositeId = new Id();
		compositeId.setIdUsuario(idUsuario);
		compositeId.setIdProcesso(idProcesso);
		Parecer processoAtualizado = parecerService.update(compositeId, parecer);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(processoAtualizado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(processoAtualizado);
	}
	
	@DeleteMapping("/{idUsuario}/{idProcesso}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long idUsuario, @PathVariable Long idProcesso){
		Id compositeId = new Id();
		compositeId.setIdUsuario(idUsuario);
		compositeId.setIdProcesso(idProcesso);
		parecerService.delete(compositeId);
		
	}
    

}
