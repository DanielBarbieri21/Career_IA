package com.careerai.infrastructure.ai;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import org.springframework.ai.chat.client.ChatClient;

import java.util.List;

@Slf4j
@Service
public class AiService {

    private final ChatClient chatClient;

    @Value("${ai.provider:openai}")
    private String defaultProvider;

    public AiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateContent(GenerationRequest request) {
        log.info("Generating content for type: {}", request.type());
        String prompt = buildPrompt(request.type(), request.context());
        return chatClient.prompt(prompt).call().content();
    }

    public Flux<String> generateStream(GenerationRequest request) {
        log.info("Streaming content for type: {}", request.type());
        String prompt = buildPrompt(request.type(), request.context());
        return chatClient.prompt(prompt).stream().content();
    }

    public AtsAnalysisResult analyzeResume(String resumeText, String jobDescription) {
        log.info("Analyzing resume against job description");
        return new AtsAnalysisResult(85, List.of("Java", "Spring"), List.of("AWS"), List.of("Add AWS to resume"));
    }

    public List<String> generateQuestions(String stack, String type, int count) {
        log.info("Generating {} {} questions for {}", count, type, stack);
        return List.of("Question 1", "Question 2");
    }

    public MatchScoreResult calculateMatchScore(String resumeText, String jobDescription) {
        log.info("Calculating match score");
        return new MatchScoreResult(85, 90, 80, 85, List.of("Gap 1"), List.of("Rec 1"));
    }

    private String buildPrompt(String type, String context) {
        return String.format("Type: %s\nContext: %s", type, context);
    }

    public record GenerationRequest(
            String type,
            String context,
            String jobId,
            String resumeId,
            String provider
    ) {}

    public record AtsAnalysisResult(
            int overallScore,
            List<String> skills,
            List<String> gaps,
            List<String> suggestions
    ) {}

    public record MatchScoreResult(
            int atsScore,
            int hrScore,
            int technicalScore,
            int finalScore,
            List<String> gaps,
            List<String> recommendations
    ) {}
}
