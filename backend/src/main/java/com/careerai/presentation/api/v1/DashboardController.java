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
    public ResponseEntity<ApiResponse<Void>> getMetrics() {
        return ResponseEntity.ok(ApiResponse.success("Metrics retrieved"));
    }

    @GetMapping("/timeline")
    @Operation(summary = "Linha do tempo de atividades")
    public ResponseEntity<ApiResponse<Void>> getTimeline() {
        return ResponseEntity.ok(ApiResponse.success("Timeline retrieved"));
    }

    @GetMapping("/tech-demand")
    @Operation(summary = "Tecnologias mais pedidas")
    public ResponseEntity<ApiResponse<Void>> getTechDemand() {
        return ResponseEntity.ok(ApiResponse.success("Tech demand retrieved"));
    }

    @GetMapping("/pipeline")
    @Operation(summary = "Pipeline de candidaturas")
    public ResponseEntity<ApiResponse<Void>> getPipeline() {
        return ResponseEntity.ok(ApiResponse.success("Pipeline retrieved"));
    }

    @GetMapping("/activities")
    @Operation(summary = "Atividades recentes")
    public ResponseEntity<ApiResponse<Void>> getActivities() {
        return ResponseEntity.ok(ApiResponse.success("Activities retrieved"));
    }

    @GetMapping("/favorite-companies")
    @Operation(summary = "Empresas favoritas com match")
    public ResponseEntity<ApiResponse<Void>> getFavoriteCompanies() {
        return ResponseEntity.ok(ApiResponse.success("Favorite companies retrieved"));
    }
}
