# Stage 1: Build
FROM golang:1.22 AS builder

WORKDIR /app

# Copy go.mod trước để cache dependencies
COPY go.mod ./
RUN go mod download

# Copy toàn bộ source
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp .

# Stage 2: Runtime
FROM alpine:3.20

RUN adduser -D appuser
WORKDIR /app

# Copy binary từ builder
COPY --from=builder /app/myapp .

USER appuser

EXPOSE 8080
CMD ["./myapp"]
