package movierankchart.security.handler;

import lombok.RequiredArgsConstructor;
import movierankchart.common.utils.CookieUtils;
import movierankchart.domain.users.costants.UsersErrorMessage;
import movierankchart.domain.users.entity.Users;
import movierankchart.domain.users.repository.UsersRepository;
import movierankchart.security.constants.TokenType;
import movierankchart.security.service.RefreshTokenService;
import movierankchart.security.service.TokenProviderService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProviderService tokenProviderService;
    private final UsersRepository usersRepository;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Users users = findUsers(authentication);
        // 리프레시 토큰 생성, 저장, 쿠키에 담기
        String refreshToken = tokenProviderService.createToken(users.getEmail(), Duration.ofSeconds(TokenType.REFRESH_TOKEN.getSeconds()));
        refreshTokenService.saveToken(users, refreshToken);
        CookieUtils.addCookie(response, TokenType.REFRESH_TOKEN.getName(), refreshToken, true);
        // oauth2 인증 팝업창을 끄기 위한 쿠키 생성
        CookieUtils.addCookie(response, TokenType.AUTHENTICATION_DONE.getName(), TokenType.AUTHENTICATION_DONE.getName(), false);
    }

    private Users findUsers(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = (String) oAuth2User.getAttributes()
                .get("email");
        return usersRepository.findUsersByEmail(email)
                .orElseThrow(() -> new NoSuchElementException(UsersErrorMessage.NOT_FOUND_USER_EMAIL));
    }
}
