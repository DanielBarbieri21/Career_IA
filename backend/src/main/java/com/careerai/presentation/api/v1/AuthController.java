package com.careerai.presentation.api.v1;

import com.careerai.domain.shared.exception.GlobalExceptionHandler.ApiResponse;
import com.careerai.domain.user.entity.User;
import com.careerai.infrastructure.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;

/**
 * Controller de Autenticação — JWT + OAuth2.
 *
 * <p>Endpoints:
 * <ul>
 *   <li>POST /api/v1/auth/refresh — Renovar access token
 *   <li>POST /api/v1/auth/logout — Revogar refresh token
 *   <li>GET  /api/v1/auth/me — Dados do usuário autenticado
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Autenticação JWT e OAuth2")
public class AuthController {

    private final JwtService jwtService;
    private final RedisTemplate<String, String> redisTemplate;

    /**
     * Renova o access token usando um refresh token válido.
     */
    @PostMapping("/refresh")
    @Operation(summary = "Renovar access token", description = "Usa um refresh token para gerar novo access token")
    public ResponseEntity<ApiResponse<TokenResponse>> refreshToken(
            @Valid @RequestBody RefreshRequest request) {

        String refreshToken = request.refreshToken();
        String tokenKey = "refresh_token:" + refreshToken;

        // Verificar se o token está no Redis (não foi revogado)
        String userEmail = redisTemplate.opsForValue().get(tokenKey);
        if (userEmail == null) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.<TokenResponse>error("Refresh token inválido ou expirado"));
        }

        // Gerar novo access token
        // Em produção: carregar UserDetails do banco
        log.info("Refresh token used for: {}", userEmail);

        var response = new TokenResponse(
                "NEW_ACCESS_TOKEN_PLACEHOLDER_" + UUID.randomUUID(),
                refreshToken,
                900 // 15 minutos
        );

        return ResponseEntity.ok(ApiResponse.success(response, "Token renovado com sucesso"));
    }

    /**
     * Revoga o refresh token (logout).
     */
    @PostMapping("/logout")
    @Operation(summary = "Logout", description = "Revoga o refresh token e invalida a sessão")
    public ResponseEntity<ApiResponse<Void>> logout(
            @Valid @RequestBody LogoutRequest request,
            @AuthenticationPrincipal User currentUser) {

        String tokenKey = "refresh_token:" + request.refreshToken();
        redisTemplate.delete(tokenKey);

        log.info("User logged out: {}", currentUser != null ? currentUser.getEmail() : "unknown");
        return ResponseEntity.ok(ApiResponse.success(null, "Logout realizado com sucesso"));
    }

    /**
     * Retorna dados do usuário autenticado.
     */
    @GetMapping("/me")
    @Operation(summary = "Usuário atual", description = "Retorna dados do usuário autenticado")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            @AuthenticationPrincipal User currentUser) {

        if (currentUser == null) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.<UserResponse>error("Não autenticado"));
        }

        var response = new UserResponse(
                currentUser.getId(),
                currentUser.getEmail(),
                currentUser.getName(),
                currentUser.getAvatarUrl(),
                currentUser.getRole().name(),
                currentUser.getProvider().name()
        );

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    // ─── Request/Response Records ────────────────────────────────

    public record RefreshRequest(
            @NotBlank(message = "Refresh token é obrigatório")
            String refreshToken
    ) {}

    public record LogoutRequest(
            @NotBlank(message = "Refresh token é obrigatório")
            String refreshToken
    ) {}

    public record TokenResponse(
            String accessToken,
            String refreshToken,
            int expiresIn
    ) {}

    public record UserResponse(
            UUID id,
            String email,
            String name,
            String avatarUrl,
            String role,
            String provider
    ) {}
}
