package com.careerai.presentation.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.careerai.presentation.exception.GlobalExceptionHandler.ApiResponse; // Adjust import as necessary

@Slf4j
@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@Tag(name = "Applications", description = "Endpoints do CRM de Candidaturas")
@SecurityRequirement(name = "bearerAuth")
public class ApplicationController {

    @PostMapping
    @Operation(summary = "Criar candidatura")
    public ResponseEntity<ApiResponse<Object>> createApplication(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Application created", null));
    }

    @GetMapping
    @Operation(summary = "Listar todas candidaturas")
    public ResponseEntity<ApiResponse<Object>> getApplications() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Applications listed", null));
    }

    @GetMapping("/kanban")
    @Operation(summary = "Agrupar por status para Kanban")
    public ResponseEntity<ApiResponse<Object>> getApplicationsKanban() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Kanban data retrieved", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar candidatura")
    public ResponseEntity<ApiResponse<Object>> getApplication(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Application found", null));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status da candidatura")
    public ResponseEntity<ApiResponse<Object>> updateStatus(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", null));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar candidatura completo")
    public ResponseEntity<ApiResponse<Object>> updateApplication(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Application updated", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar candidatura")
    public ResponseEntity<ApiResponse<Object>> deleteApplication(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Application deleted", null));
    }

    @PostMapping("/{id}/notes")
    @Operation(summary = "Adicionar nota à candidatura")
    public ResponseEntity<ApiResponse<Object>> addNote(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Note added", null));
    }

    @GetMapping("/{id}/timeline")
    @Operation(summary = "Timeline de etapas da candidatura")
    public ResponseEntity<ApiResponse<Object>> getTimeline(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Timeline retrieved", null));
    }
}
