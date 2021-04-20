package com.softplan.core.token;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/*O propósito dessa classe é interceptar o retorno da chamada ao token para que o refresh_token seja posto em um cookie. */

@ControllerAdvice
public class RefreshTokenPostProcessor implements ResponseBodyAdvice<OAuth2AccessToken> {

	/*Intercepta o retorno cujo objeto seja do tipo OAuth2AccessToken.*/
	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		return returnType.getMethod().getName().equals("postAccessToken"); 
	}

	/*Pega o conteúdo do refresh_token e adiciona em um cookie que sera adicionado posto na requisição e removido do body. */
	@Override
	public OAuth2AccessToken beforeBodyWrite(OAuth2AccessToken body, MethodParameter returnType,
			MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType,
			ServerHttpRequest request, ServerHttpResponse response) {

		// convertendo o request e o response de server para http
		HttpServletRequest req = ((ServletServerHttpRequest) request).getServletRequest();
		HttpServletResponse resp = ((ServletServerHttpResponse) response).getServletResponse();

		// aqui é pego do corpo Do OAuthAccessToken o Refreshtoken
		String refreshToken = body.getRefreshToken().getValue();
		addRefreshTokenToCookie(refreshToken, req, resp);

		// cast necessário para ter acesso ao métrodo setRefreshToken pois não tem na
		// classe OAuthAccessToken
		DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) body;

		removeCookieFromBody(token);

		return body;
	}

	//cria e adiciona o cookie ao response
	private void addRefreshTokenToCookie(String refreshToken, HttpServletRequest req, HttpServletResponse resp) {

		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(false);
		refreshTokenCookie.setPath(req.getContextPath() + "/oauth/token");
		refreshTokenCookie.setMaxAge(3600*24*30);

		resp.addCookie(refreshTokenCookie);

	}
	
	private void removeCookieFromBody(DefaultOAuth2AccessToken token) {
		token.setRefreshToken(null);
	}
	
}
