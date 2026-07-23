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
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Jobs", description = "Endpoints para gerenciamento de vagas")
@SecurityRequirement(name = "bearerAuth")
public class JobController {

    @PostMapping("/import")
    @Operation(summary = "Importar vaga")
    public ResponseEntity<ApiResponse<Void>> importJob(@RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Job imported successfully"));
    }

    @GetMapping
    @Operation(summary = "Listar vagas com paginação")
    public ResponseEntity<ApiResponse<Void>> listJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String filter) {
        return ResponseEntity.ok(ApiResponse.success("Jobs listed"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar vaga")
    public ResponseEntity<ApiResponse<Void>> getJob(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Job found"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar vaga")
    public ResponseEntity<ApiResponse<Void>> updateJob(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Job updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar vaga")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Job deleted"));
    }

    @PostMapping("/{id}/analyze")
    @Operation(summary = "Analisar vaga com IA")
    public ResponseEntity<ApiResponse<Void>> analyzeJob(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Job analyzed"));
    }

    @GetMapping("/search")
    @Operation(summary = "Busca full-text de vagas")
    public ResponseEntity<ApiResponse<Void>> searchJobs(@RequestParam String query) {
        return ResponseEntity.ok(ApiResponse.success("Jobs search results"));
    }
}
