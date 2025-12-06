package models

import (
	"time"

	"gorm.io/gorm"
)

type Scan struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	AssetID     uint           `json:"asset_id" gorm:"not null"`
	Type        string         `json:"type" gorm:"not null"`
	Status      string         `json:"status" gorm:"default:'pending'"`
	Results     string         `json:"results" gorm:"type:text"`
	StartedAt   *time.Time     `json:"started_at"`
	CompletedAt *time.Time     `json:"completed_at"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Asset       Asset          `json:"asset,omitempty"`
	Evidence    []Evidence     `json:"evidence,omitempty"`
}
