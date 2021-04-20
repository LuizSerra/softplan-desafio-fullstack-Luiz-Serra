package com.softplan.core.model;

import java.io.Serializable;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

//Tabela de relacionamento entre Usuario e Processo, e contem um atributo mensagem

@Entity(name = "parecer")
@Table(schema = "testdb")
public class Parecer {

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "id_processo", column = @Column(name = "id_processo", nullable = false)),
			@AttributeOverride(name = "id_usuario", column = @Column(name = "id_usuario", nullable = false)) })
	private Id id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_processo", nullable = false, insertable = false, updatable = false)
	private Processo processo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_usuario", nullable = false, insertable = false, updatable = false)
	private Usuario usuario;

	private String descricao;

	public Id getId() {
		return id;
	}

	public void setId(Id id) {
		this.id = id;
	}

	public Processo getProcesso() {
		return processo;
	}

	public void setProcesso(Processo processo) {
		this.processo = processo;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	// Id da associacao (chave composta no banco)
	@Embeddable
	public static class Id implements Serializable {

		/**
			 * 
			 */
		private static final long serialVersionUID = 6020117944096559128L;

		@Column(name = "id_processo", nullable = false)
		private Long idProcesso;

		@Column(name = "id_usuario", nullable = false)
		private Long IdUsuario;

		public Long getIdProcesso() {
			return idProcesso;
		}

		public void setIdProcesso(Long idProcesso) {
			this.idProcesso = idProcesso;
		}

		public Long getIdUsuario() {
			return IdUsuario;
		}

		public void setIdUsuario(Long idUsuario) {
			IdUsuario = idUsuario;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((IdUsuario == null) ? 0 : IdUsuario.hashCode());
			result = prime * result + ((idProcesso == null) ? 0 : idProcesso.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Id other = (Id) obj;
			if (IdUsuario == null) {
				if (other.IdUsuario != null)
					return false;
			} else if (!IdUsuario.equals(other.IdUsuario))
				return false;
			if (idProcesso == null) {
				if (other.idProcesso != null)
					return false;
			} else if (!idProcesso.equals(other.idProcesso))
				return false;
			return true;
		}

	}

}
