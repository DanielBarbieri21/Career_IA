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
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Jobs", description = "Endpoints para gerenciamento de vagas")
@SecurityRequirement(name = "bearerAuth")
public class JobController {

    @PostMapping("/import")
    @Operation(summary = "Importar vaga")
    public ResponseEntity<ApiResponse<Object>> importJob(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Job imported successfully", null));
    }

    @GetMapping
    @Operation(summary = "Listar vagas com paginação")
    public ResponseEntity<ApiResponse<Object>> listJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String filter) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Jobs listed", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar vaga")
    public ResponseEntity<ApiResponse<Object>> getJob(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Job found", null));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar vaga")
    public ResponseEntity<ApiResponse<Object>> updateJob(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Job updated", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar vaga")
    public ResponseEntity<ApiResponse<Object>> deleteJob(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Job deleted", null));
    }

    @PostMapping("/{id}/analyze")
    @Operation(summary = "Analisar vaga com IA")
    public ResponseEntity<ApiResponse<Object>> analyzeJob(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Job analyzed", null));
    }

    @GetMapping("/search")
    @Operation(summary = "Busca full-text de vagas")
    public ResponseEntity<ApiResponse<Object>> searchJobs(@RequestParam String query) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Jobs search results", null));
    }
}
