package models

import (
	"time"

	"gorm.io/gorm"
)

type Asset struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Name       string         `json:"name" gorm:"not null"`
	Type       string         `json:"type" gorm:"not null"`
	Repository string         `json:"repository"`
	Branch     string         `json:"branch"`
	Status     string         `json:"status" gorm:"default:'active'"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Scans      []Scan         `json:"scans,omitempty"`
}
