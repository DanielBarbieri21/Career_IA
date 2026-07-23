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
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@Tag(name = "Resumes", description = "Endpoints para gerenciamento de currículos")
@SecurityRequirement(name = "bearerAuth")
public class ResumeController {

    @PostMapping("/upload")
    @Operation(summary = "Upload de currículo em PDF/DOCX")
    public ResponseEntity<ApiResponse<Void>> uploadResume(@RequestParam("file") MultipartFile file) {
        log.info("Uploading resume: {}", file.getOriginalFilename());
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded successfully"));
    }

    @GetMapping
    @Operation(summary = "Listar currículos do usuário")
    public ResponseEntity<ApiResponse<Void>> listResumes() {
        return ResponseEntity.ok(ApiResponse.success("Resumes listed"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar currículo por ID")
    public ResponseEntity<ApiResponse<Void>> getResume(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Resume found"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar currículo")
    public ResponseEntity<ApiResponse<Void>> updateResume(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Resume updated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar currículo")
    public ResponseEntity<ApiResponse<Void>> deleteResume(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Resume deleted"));
    }

    @PostMapping("/{id}/analyze-ats")
    @Operation(summary = "Analisar currículo para ATS")
    public ResponseEntity<ApiResponse<Void>> analyzeAts(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Resume analyzed"));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download do arquivo do currículo")
    public ResponseEntity<Object> downloadResume(@PathVariable String id) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/versions")
    @Operation(summary = "Histórico de versões do currículo")
    public ResponseEntity<ApiResponse<Void>> getResumeVersions(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Resume versions listed"));
    }

    @PostMapping("/{id}/versions/{versionId}/restore")
    @Operation(summary = "Restaurar versão do currículo")
    public ResponseEntity<ApiResponse<Void>> restoreResumeVersion(@PathVariable String id, @PathVariable String versionId) {
        return ResponseEntity.ok(ApiResponse.success("Resume version restored"));
    }

    @PostMapping("/{id}/export-linkedin")
    @Operation(summary = "Exportar currículo para o LinkedIn")
    public ResponseEntity<ApiResponse<Void>> exportToLinkedIn(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Resume exported to LinkedIn"));
    }
}
