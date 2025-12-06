package models

import (
	"time"

	"gorm.io/gorm"
)

type Exception struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	EvidenceID uint           `json:"evidence_id" gorm:"not null"`
	Reason     string         `json:"reason" gorm:"not null"`
	Status     string         `json:"status" gorm:"default:'pending'"`
	ApprovedBy string         `json:"approved_by"`
	ApprovedAt *time.Time     `json:"approved_at"`
	ExpiresAt  *time.Time     `json:"expires_at"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Evidence   Evidence       `json:"evidence,omitempty"`
}
