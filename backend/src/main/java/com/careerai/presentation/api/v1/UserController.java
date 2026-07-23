package com.careerai.presentation.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.careerai.presentation.exception.GlobalExceptionHandler.ApiResponse; // Adjust import as necessary

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Endpoints do Usuário")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @GetMapping("/me")
    @Operation(summary = "Perfil completo")
    public ResponseEntity<ApiResponse<Object>> getMyProfile() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile retrieved", null));
    }

    @PutMapping("/me")
    @Operation(summary = "Atualizar perfil")
    public ResponseEntity<ApiResponse<Object>> updateMyProfile(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated", null));
    }

    @PostMapping("/me/avatar")
    @Operation(summary = "Upload foto do avatar")
    public ResponseEntity<ApiResponse<Object>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Avatar uploaded", null));
    }

    @GetMapping("/me/gamification")
    @Operation(summary = "XP, level, badges, streak")
    public ResponseEntity<ApiResponse<Object>> getGamification() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Gamification data retrieved", null));
    }

    @GetMapping("/me/stats")
    @Operation(summary = "Estatísticas gerais")
    public ResponseEntity<ApiResponse<Object>> getStats() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats retrieved", null));
    }

    @DeleteMapping("/me")
    @Operation(summary = "Excluir conta (LGPD)")
    public ResponseEntity<ApiResponse<Object>> deleteMyAccount() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Account deleted", null));
    }

    @GetMapping("/me/export")
    @Operation(summary = "Exportar dados (LGPD)")
    public ResponseEntity<ApiResponse<Object>> exportMyData() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Data exported", null));
    }
}
