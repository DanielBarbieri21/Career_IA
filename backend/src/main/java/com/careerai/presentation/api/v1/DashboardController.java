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
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Endpoints do Dashboard")
@SecurityRequirement(name = "bearerAuth")
public class DashboardController {

    @GetMapping("/metrics")
    @Operation(summary = "Métricas principais")
    public ResponseEntity<ApiResponse<Object>> getMetrics() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Metrics retrieved", null));
    }

    @GetMapping("/timeline")
    @Operation(summary = "Linha do tempo de atividades")
    public ResponseEntity<ApiResponse<Object>> getTimeline() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Timeline retrieved", null));
    }

    @GetMapping("/tech-demand")
    @Operation(summary = "Tecnologias mais pedidas")
    public ResponseEntity<ApiResponse<Object>> getTechDemand() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Tech demand retrieved", null));
    }

    @GetMapping("/pipeline")
    @Operation(summary = "Pipeline de candidaturas")
    public ResponseEntity<ApiResponse<Object>> getPipeline() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Pipeline retrieved", null));
    }

    @GetMapping("/activities")
    @Operation(summary = "Atividades recentes")
    public ResponseEntity<ApiResponse<Object>> getActivities() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Activities retrieved", null));
    }

    @GetMapping("/favorite-companies")
    @Operation(summary = "Empresas favoritas com match")
    public ResponseEntity<ApiResponse<Object>> getFavoriteCompanies() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Favorite companies retrieved", null));
    }
}
