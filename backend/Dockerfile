# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Install git (needed for go mod download with private repos)
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the main API binary
RUN go build -o app ./cmd/api

# Build the DB init binary
RUN go build -o dbinit ./cmd/dbinit

# Final image
FROM alpine:latest

WORKDIR /app

# Copy built binaries
COPY --from=builder /app/app .
COPY --from=builder /app/dbinit .

# Expose the app port (default 8080, can be set via env)
EXPOSE 8080

# Entrypoint: run dbinit (migrations) then start the app
CMD ["sh", "-c", "./dbinit && ./app"]