package com.careerai.presentation.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.careerai.domain.shared.exception.GlobalExceptionHandler.ApiResponse;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Endpoints do Usuário")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @GetMapping("/me")
    @Operation(summary = "Perfil completo")
    public ResponseEntity<ApiResponse<Void>> getMyProfile() {
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved"));
    }

    @PutMapping("/me")
    @Operation(summary = "Atualizar perfil")
    public ResponseEntity<ApiResponse<Void>> updateMyProfile(@RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated"));
    }

    @PostMapping("/me/avatar")
    @Operation(summary = "Upload foto do avatar")
    public ResponseEntity<ApiResponse<Void>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.success("Avatar uploaded"));
    }

    @GetMapping("/me/gamification")
    @Operation(summary = "XP, level, badges, streak")
    public ResponseEntity<ApiResponse<Void>> getGamification() {
        return ResponseEntity.ok(ApiResponse.success("Gamification data retrieved"));
    }

    @GetMapping("/me/stats")
    @Operation(summary = "Estatísticas gerais")
    public ResponseEntity<ApiResponse<Void>> getStats() {
        return ResponseEntity.ok(ApiResponse.success("Stats retrieved"));
    }

    @DeleteMapping("/me")
    @Operation(summary = "Excluir conta (LGPD)")
    public ResponseEntity<ApiResponse<Void>> deleteMyAccount() {
        return ResponseEntity.ok(ApiResponse.success("Account deleted"));
    }

    @GetMapping("/me/export")
    @Operation(summary = "Exportar dados (LGPD)")
    public ResponseEntity<ApiResponse<Void>> exportMyData() {
        return ResponseEntity.ok(ApiResponse.success("Data exported"));
    }
}
