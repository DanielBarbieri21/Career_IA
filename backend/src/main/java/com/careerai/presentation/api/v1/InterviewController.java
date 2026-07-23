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
@RequestMapping("/api/v1/interviews")
@RequiredArgsConstructor
@Tag(name = "Interviews", description = "Endpoints de Entrevistas")
@SecurityRequirement(name = "bearerAuth")
public class InterviewController {

    @PostMapping
    @Operation(summary = "Criar sessão de entrevista")
    public ResponseEntity<ApiResponse<Void>> createInterview(@RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Interview created"));
    }

    @GetMapping
    @Operation(summary = "Listar sessões de entrevista")
    public ResponseEntity<ApiResponse<Void>> getInterviews() {
        return ResponseEntity.ok(ApiResponse.success("Interviews listed"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar sessão de entrevista")
    public ResponseEntity<ApiResponse<Void>> getInterview(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Interview found"));
    }

    @PostMapping("/{id}/questions")
    @Operation(summary = "Gerar perguntas")
    public ResponseEntity<ApiResponse<Void>> generateQuestions(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Questions generated"));
    }

    @PostMapping("/{id}/questions/{qId}/answer")
    @Operation(summary = "Submeter resposta")
    public ResponseEntity<ApiResponse<Void>> submitAnswer(@PathVariable String id, @PathVariable String qId, @RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Answer submitted"));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Finalizar sessão")
    public ResponseEntity<ApiResponse<Void>> completeInterview(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Interview completed"));
    }

    @GetMapping("/{id}/feedback")
    @Operation(summary = "Obter feedback completo")
    public ResponseEntity<ApiResponse<Void>> getFeedback(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Feedback retrieved"));
    }
}
