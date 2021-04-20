package com.softplan.core.token;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.catalina.util.ParameterMap;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/*essa classe serve para obter o refreshtoken que estará
no Cookie e colocá-lo na requisição;*/

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RefreshTokenCookiePreProcessor implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;

		/* verifica se é uma requisição para /oauth/token, se tem o parametro grant_type com valor refresh_token
		 * por fim verifica se existe um cookie nessa requisição
		 */
		if ("/oauth/token".equalsIgnoreCase(req.getRequestURI())
				&& "refresh_token".equalsIgnoreCase(req.getParameter("grant_type")) && req.getCookies() != null) {
			
			/*varrer os cookies em busca do cookie refreshToken e obtem o valor dele*/
			for (Cookie cookie : req.getCookies()) {

				if (cookie.getName().equals("refreshToken")) {
					String refreshToken = cookie.getValue();
					req = new MyServletRequestWrapper(req, refreshToken);
				}
			}
		}
		chain.doFilter(req, response);
	}

	/* Classe para envelopar o refresh token de volta ao request*/
	static class MyServletRequestWrapper extends HttpServletRequestWrapper {

		String refreshToken;

		public MyServletRequestWrapper(HttpServletRequest request, String refreshToken) {
			super(request);
			this.refreshToken = refreshToken;
		}

		@Override
		public Map<String, String[]> getParameterMap() {
			ParameterMap<String, String[]> map = new ParameterMap<>(getRequest().getParameterMap());
			map.put("refresh_token", new String[] { refreshToken });
			map.setLocked(true);
			return map;
		}

	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
