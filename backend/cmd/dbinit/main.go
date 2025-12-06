package main

import (
	"fmt"
	"log"

	"github.com/patil-rushikesh/scm-backend/config"
	"github.com/patil-rushikesh/scm-backend/shared/database"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err := database.AutoMigrate(db); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	fmt.Println("Database initialized and migrated successfully!")
}
