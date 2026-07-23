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
    public ResponseEntity<ApiResponse<Object>> createInterview(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Interview created", null));
    }

    @GetMapping
    @Operation(summary = "Listar sessões de entrevista")
    public ResponseEntity<ApiResponse<Object>> getInterviews() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Interviews listed", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar sessão de entrevista")
    public ResponseEntity<ApiResponse<Object>> getInterview(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Interview found", null));
    }

    @PostMapping("/{id}/questions")
    @Operation(summary = "Gerar perguntas")
    public ResponseEntity<ApiResponse<Object>> generateQuestions(@PathVariable String id, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Questions generated", null));
    }

    @PostMapping("/{id}/questions/{qId}/answer")
    @Operation(summary = "Submeter resposta")
    public ResponseEntity<ApiResponse<Object>> submitAnswer(@PathVariable String id, @PathVariable String qId, @RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Answer submitted", null));
    }

    @PostMapping("/{id}/complete")
    @Operation(summary = "Finalizar sessão")
    public ResponseEntity<ApiResponse<Object>> completeInterview(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Interview completed", null));
    }

    @GetMapping("/{id}/feedback")
    @Operation(summary = "Obter feedback completo")
    public ResponseEntity<ApiResponse<Object>> getFeedback(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Feedback retrieved", null));
    }
}
