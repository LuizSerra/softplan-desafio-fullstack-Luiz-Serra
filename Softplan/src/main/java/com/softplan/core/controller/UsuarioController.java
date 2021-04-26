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

import com.softplan.core.model.Usuario;
import com.softplan.core.repository.UsuarioRepository;
import com.softplan.core.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
    UsuarioRepository usuarioRepository;
	
	
	@PreAuthorize("hasAnyAuthority('ADM', 'TRIADOR')")
	@GetMapping
    public ResponseEntity<List<Usuario>> getAllUsers(
                        @RequestParam(defaultValue = "0") Integer pageNo, 
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy) 
    {
        List<Usuario> usuarios = usuarioService.getAllUsers(pageNo, pageSize, sortBy);
 
        return !usuarios.isEmpty() ? ResponseEntity.ok(usuarios) : ResponseEntity.noContent().build();
    }
	@PreAuthorize("hasAnyAuthority('ADM', 'FINALIZADOR', 'TRIADOR')")
	@GetMapping("/ativos")
    public ResponseEntity<List<Usuario>> getAllUsersActive(
                        @RequestParam(defaultValue = "0") Integer pageNo, 
                        @RequestParam(defaultValue = "10") Integer pageSize,
                        @RequestParam(defaultValue = "id") String sortBy) 
    {
        List<Usuario> usuarios = usuarioService.getAllUsersActive(pageNo, pageSize, sortBy);
 
        return !usuarios.isEmpty() ? ResponseEntity.ok(usuarios) : ResponseEntity.noContent().build();
    }
	
	@PreAuthorize("hasAnyAuthority('ADM', 'FINALIZADOR', 'TRIADOR')")
	@GetMapping("/{id}")
    public ResponseEntity<Usuario> getByID(@PathVariable Long id) 
    {
		Usuario usuarioEncontrado = usuarioService.findById(id);
		return usuarioEncontrado != null ? ResponseEntity.ok().body(usuarioEncontrado) : ResponseEntity.notFound().build();
    }
	
	@PreAuthorize("hasAnyAuthority('ADM')")
	@PostMapping
	public ResponseEntity<Usuario> criar(@Valid @RequestBody Usuario usuario, HttpServletResponse response) {
		
		Usuario usuarioCriado = usuarioService.create(usuario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(usuarioCriado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(usuarioCriado);
	}
	@PreAuthorize("hasAnyAuthority('ADM')")
	@PutMapping("/{id}")
	public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @Valid @RequestBody Usuario usuario, HttpServletResponse response) {
		Usuario usuarioAtualizado = usuarioService.update(id,usuario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(usuarioAtualizado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(usuarioAtualizado);
	}
	@PreAuthorize("hasAnyAuthority('ADM')")
	@PutMapping("/{id}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Usuario> atualizarPropriedadeAtivo(@PathVariable Long id, @RequestBody boolean ativo){
		Usuario usuarioAtualizado =	usuarioService.updateStatus(id, ativo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
				.buildAndExpand(usuarioAtualizado.getId()).toUri();
		
		return ResponseEntity.created(uri).body(usuarioAtualizado);
	}
	@PreAuthorize("hasAnyAuthority('ADM')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id){
		usuarioService.delete(id);
		
	}
    

}
