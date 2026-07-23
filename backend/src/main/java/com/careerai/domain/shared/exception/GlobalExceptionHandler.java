package com.careerai.domain.shared.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Handler global de exceções para toda a API REST.
 * Retorna respostas padronizadas no formato ApiResponse<T>.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ─── ApiResponse Record ───────────────────────────────────────

    public record ApiResponse<T>(
            boolean success,
            T data,
            String message,
            LocalDateTime timestamp,
            Map<String, String> errors,
            String traceId
    ) {
        public static <T> ApiResponse<T> success(T data, String message) {
            return new ApiResponse<>(true, data, message, LocalDateTime.now(), null, UUID.randomUUID().toString());
        }

        public static <T> ApiResponse<T> success(T data) {
            return success(data, "Operação realizada com sucesso");
        }

        public static ApiResponse<Void> error(String message, Map<String, String> errors) {
            return new ApiResponse<>(false, null, message, LocalDateTime.now(), errors, UUID.randomUUID().toString());
        }

        public static ApiResponse<Void> error(String message) {
            return error(message, null);
        }
    }

    // ─── Exceções de Negócio ──────────────────────────────────────

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(EntityNotFoundException e) {
        log.warn("Entity not found: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage()));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusiness(BusinessException e) {
        log.warn("Business rule violation: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(ApiResponse.error(e.getMessage()));
    }

    // ─── Validação ────────────────────────────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = error instanceof FieldError fe ? fe.getField() : error.getObjectName();
            errors.put(fieldName, error.getDefaultMessage());
        });
        log.debug("Validation failed: {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Dados inválidos. Verifique os campos.", errors));
    }

    // ─── Segurança ────────────────────────────────────────────────

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDenied(AccessDeniedException e) {
        log.warn("Access denied: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.error("Acesso negado. Você não tem permissão para esta ação."));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Void>> handleAuthentication(AuthenticationException e) {
        log.warn("Authentication failed: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Autenticação necessária. Faça login para continuar."));
    }

    // ─── Upload ───────────────────────────────────────────────────

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleFileSize(MaxUploadSizeExceededException e) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ApiResponse.error("Arquivo muito grande. Tamanho máximo: 10MB."));
    }

    // ─── Rate Limit ───────────────────────────────────────────────

    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ApiResponse<Void>> handleRateLimit(RateLimitException e) {
        log.warn("Rate limit exceeded: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(ApiResponse.error("Muitas requisições. Aguarde um momento antes de tentar novamente."));
    }

    // ─── Genérico ─────────────────────────────────────────────────

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception e) {
        log.error("Unexpected error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Ocorreu um erro interno. Nossa equipe foi notificada."));
    }

    // ─── Custom Exceptions ────────────────────────────────────────

    public static class EntityNotFoundException extends RuntimeException {
        public EntityNotFoundException(String message) { super(message); }
        public EntityNotFoundException(String entity, Object id) {
            super("%s com id '%s' não encontrado.".formatted(entity, id));
        }
    }

    public static class BusinessException extends RuntimeException {
        public BusinessException(String message) { super(message); }
    }

    public static class RateLimitException extends RuntimeException {
        public RateLimitException(String message) { super(message); }
    }
}
