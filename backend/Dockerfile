FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Cache de dependências Maven
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Build da aplicação
COPY src ./src
RUN ./mvnw package -DskipTests -B --no-transfer-progress

# ─── Runtime Stage ───────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Segurança: usuário não-root
RUN addgroup -S careerai && adduser -S careerai -G careerai
USER careerai

# Copiar JAR
COPY --from=builder /app/target/*.jar app.jar

# Upload directory
RUN mkdir -p /app/uploads && chown -R careerai:careerai /app/uploads

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

# JVM tuning para containers com Virtual Threads
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-XX:+ExitOnOutOfMemoryError", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:dev}", \
  "-jar", "app.jar"]
