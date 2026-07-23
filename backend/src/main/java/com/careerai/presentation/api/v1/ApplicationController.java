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
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@Tag(name = "Applications", description = "Endpoints do CRM de Candidaturas")
@SecurityRequirement(name = "bearerAuth")
public class ApplicationController {

    @PostMapping
    @Operation(summary = "Criar candidatura")
    public ResponseEntity<ApiResponse<Void>> createApplication(@RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Application created"));
    }

    @GetMapping
    @Operation(summary = "Listar todas candidaturas")
    public ResponseEntity<ApiResponse<Void>> getApplications() {
        return ResponseEntity.ok(ApiResponse.success("Applications listed"));
    }

    @GetMapping("/kanban")
    @Operation(summary = "Agrupar por status para Kanban")
    public ResponseEntity<ApiResponse<Void>> getApplicationsKanban() {
        return ResponseEntity.ok(ApiResponse.success("Kanban data retrieved"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar candidatura")
    public ResponseEntity<ApiResponse<Void>> getApplication(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Application found"));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status da candidatura")
    public ResponseEntity<ApiResponse<Void>> updateStatus(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Status updated"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar candidatura completo")
    public ResponseEntity<ApiResponse<Void>> updateApplication(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Application updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar candidatura")
    public ResponseEntity<ApiResponse<Void>> deleteApplication(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Application deleted"));
    }

    @PostMapping("/{id}/notes")
    @Operation(summary = "Adicionar nota à candidatura")
    public ResponseEntity<ApiResponse<Void>> addNote(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Note added"));
    }

    @GetMapping("/{id}/timeline")
    @Operation(summary = "Timeline de etapas da candidatura")
    public ResponseEntity<ApiResponse<Void>> getTimeline(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Timeline retrieved"));
    }
}
