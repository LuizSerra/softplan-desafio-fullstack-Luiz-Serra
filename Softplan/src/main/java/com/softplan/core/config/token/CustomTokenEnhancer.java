package com.softplan.core.config.token;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import com.softplan.core.security.UsuarioSistema;

/*Classe que adiciona informações ao JWTToken
Assim é possível recuperar essas informações a partir do token*/

public class CustomTokenEnhancer implements TokenEnhancer {

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		UsuarioSistema usuarioSistema = (UsuarioSistema) authentication.getPrincipal();
		Map<String, Object> addInfo = new HashMap<>();
		addInfo.put("id", usuarioSistema.getUsuario().getId());
		addInfo.put("nome", usuarioSistema.getUsuario().getNome());
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(addInfo);
		
		return accessToken;
	}

}
