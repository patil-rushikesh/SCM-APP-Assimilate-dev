package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	AppName  string
	Env      string
	Database DatabaseConfig
	Server   ServerConfig
}

type DatabaseConfig struct {
	ConnectionString string
}

type ServerConfig struct {
	Host string
	Port int
}

func LoadConfig() (*Config, error) {
	_ = godotenv.Load()

	portStr := getEnv("PORT", "8080")
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return nil, err
	}

	return &Config{
		AppName: getEnv("APP_NAME", "scm-backend"),
		Env:     getEnv("ENV", "dev"),
		Database: DatabaseConfig{
			ConnectionString: getEnv("DATABASE_URL", ""),
		},
		Server: ServerConfig{
			Host: getEnv("SERVER_HOST", "0.0.0.0"),
			Port: port,
		},
	}, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
