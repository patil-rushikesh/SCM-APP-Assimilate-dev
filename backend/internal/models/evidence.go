package models

import (
	"time"

	"gorm.io/gorm"
)

type Evidence struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	ScanID      uint           `json:"scan_id" gorm:"not null"`
	Type        string         `json:"type" gorm:"not null"`
	FilePath    string         `json:"file_path"`
	Description string         `json:"description"`
	Severity    string         `json:"severity"`
	Status      string         `json:"status" gorm:"default:'open'"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Scan        Scan           `json:"scan,omitempty"`
}
