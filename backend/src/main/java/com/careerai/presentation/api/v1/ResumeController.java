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
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@Tag(name = "Resumes", description = "Endpoints para gerenciamento de currículos")
@SecurityRequirement(name = "bearerAuth")
public class ResumeController {

    @PostMapping("/upload")
    @Operation(summary = "Upload de currículo em PDF/DOCX")
    public ResponseEntity<ApiResponse<Object>> uploadResume(@RequestParam("file") MultipartFile file) {
        log.info("Uploading resume: {}", file.getOriginalFilename());
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume uploaded successfully", null));
    }

    @GetMapping
    @Operation(summary = "Listar currículos do usuário")
    public ResponseEntity<ApiResponse<Object>> listResumes() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resumes listed", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar currículo por ID")
    public ResponseEntity<ApiResponse<Object>> getResume(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume found", null));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar currículo")
    public ResponseEntity<ApiResponse<Object>> updateResume(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume updated", null));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar currículo")
    public ResponseEntity<ApiResponse<Object>> deleteResume(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume deleted", null));
    }

    @PostMapping("/{id}/analyze-ats")
    @Operation(summary = "Analisar currículo para ATS")
    public ResponseEntity<ApiResponse<Object>> analyzeAts(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume analyzed", null));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download do arquivo do currículo")
    public ResponseEntity<Object> downloadResume(@PathVariable String id) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/versions")
    @Operation(summary = "Histórico de versões do currículo")
    public ResponseEntity<ApiResponse<Object>> getResumeVersions(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume versions listed", null));
    }

    @PostMapping("/{id}/versions/{versionId}/restore")
    @Operation(summary = "Restaurar versão do currículo")
    public ResponseEntity<ApiResponse<Object>> restoreResumeVersion(@PathVariable String id, @PathVariable String versionId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume version restored", null));
    }

    @PostMapping("/{id}/export-linkedin")
    @Operation(summary = "Exportar currículo para o LinkedIn")
    public ResponseEntity<ApiResponse<Object>> exportToLinkedIn(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Resume exported to LinkedIn", null));
    }
}
