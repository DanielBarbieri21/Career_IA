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
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
@Tag(name = "Match", description = "Endpoints do Match Engine")
@SecurityRequirement(name = "bearerAuth")
public class MatchController {

    @PostMapping("/calculate")
    @Operation(summary = "Calcular match")
    public ResponseEntity<ApiResponse<Object>> calculateMatch(@RequestBody Object request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Match calculated", null));
    }

    @GetMapping
    @Operation(summary = "Histórico de matches")
    public ResponseEntity<ApiResponse<Object>> getMatches() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Matches listed", null));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalhes do match")
    public ResponseEntity<ApiResponse<Object>> getMatch(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Match details found", null));
    }

    @GetMapping("/top-jobs")
    @Operation(summary = "Top vagas por score")
    public ResponseEntity<ApiResponse<Object>> getTopJobs() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Top jobs listed", null));
    }

    @GetMapping("/career-intelligence/{jobId}")
    @Operation(summary = "Career Intelligence Score completo")
    public ResponseEntity<ApiResponse<Object>> getCareerIntelligence(@PathVariable String jobId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Career intelligence score retrieved", null));
    }
}
