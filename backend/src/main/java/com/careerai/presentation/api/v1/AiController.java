package com.careerai.presentation.api.v1;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.careerai.domain.shared.exception.GlobalExceptionHandler.ApiResponse;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI", description = "Endpoints da IA Generativa")
@SecurityRequirement(name = "bearerAuth")
public class AiController {

    @PostMapping("/generate")
    @Operation(summary = "Geração de conteúdo")
    public ResponseEntity<ApiResponse<Object>> generateContent(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Content generated", null));
    }

    @GetMapping("/stream")
    @Operation(summary = "SSE endpoint para streaming de resposta")
    public SseEmitter streamContent() {
        return new SseEmitter();
    }

    @GetMapping("/history")
    @Operation(summary = "Histórico de gerações")
    public ResponseEntity<ApiResponse<Object>> getAiHistory() {
        return ResponseEntity.ok(new ApiResponse<>(true, "AI history listed", null));
    }

    @PostMapping("/rag/analyze")
    @Operation(summary = "Análise RAG de vaga vs currículo")
    public ResponseEntity<ApiResponse<Object>> analyzeRag(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "RAG analysis complete", null));
    }

    @GetMapping("/providers")
    @Operation(summary = "Provedores disponíveis")
    public ResponseEntity<ApiResponse<Object>> getProviders() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Providers listed", null));
    }
}
