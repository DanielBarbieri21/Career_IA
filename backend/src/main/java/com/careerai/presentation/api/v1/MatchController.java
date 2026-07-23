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
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
@Tag(name = "Match", description = "Endpoints do Match Engine")
@SecurityRequirement(name = "bearerAuth")
public class MatchController {

    @PostMapping("/calculate")
    @Operation(summary = "Calcular match")
    public ResponseEntity<ApiResponse<Void>> calculateMatch(@RequestBody Object request) {
        return ResponseEntity.ok(ApiResponse.success("Match calculated"));
    }

    @GetMapping
    @Operation(summary = "Histórico de matches")
    public ResponseEntity<ApiResponse<Void>> getMatches() {
        return ResponseEntity.ok(ApiResponse.success("Matches listed"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalhes do match")
    public ResponseEntity<ApiResponse<Void>> getMatch(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Match details found"));
    }

    @GetMapping("/top-jobs")
    @Operation(summary = "Top vagas por score")
    public ResponseEntity<ApiResponse<Void>> getTopJobs() {
        return ResponseEntity.ok(ApiResponse.success("Top jobs listed"));
    }

    @GetMapping("/career-intelligence/{jobId}")
    @Operation(summary = "Career Intelligence Score completo")
    public ResponseEntity<ApiResponse<Void>> getCareerIntelligence(@PathVariable String jobId) {
        return ResponseEntity.ok(ApiResponse.success("Career intelligence score retrieved"));
    }
}
