package com.careerai.presentation.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.careerai.domain.shared.exception.GlobalExceptionHandler.ApiResponse;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Endpoints de Notificações")
@SecurityRequirement(name = "bearerAuth")
public class NotificationController {

    @GetMapping
    @Operation(summary = "Listar notificações")
    public ResponseEntity<ApiResponse<Object>> listNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications listed", null));
    }

    @GetMapping("/count-unread")
    @Operation(summary = "Contar notificações não lidas")
    public ResponseEntity<ApiResponse<Object>> countUnread() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Unread count retrieved", null));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Marcar como lida")
    public ResponseEntity<ApiResponse<Object>> markAsRead(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notification marked as read", null));
    }

    @PostMapping("/read-all")
    @Operation(summary = "Marcar todas como lidas")
    public ResponseEntity<ApiResponse<Object>> markAllAsRead() {
        return ResponseEntity.ok(new ApiResponse<>(true, "All notifications marked as read", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar notificação")
    public ResponseEntity<ApiResponse<Object>> deleteNotification(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Notification deleted", null));
    }
}
