package repository

import (
	"gorm.io/gorm"
)

type Repositories struct {
	User      UserRepository
	Asset     AssetRepository
	// Scan      ScanRepository
	// Evidence  EvidenceRepository
	// Exception ExceptionRepository
}

func NewRepositories(db *gorm.DB) *Repositories {
	return &Repositories{
		User:      NewUserRepository(db),
		Asset:     NewAssetRepository(db),
		// Scan:      NewScanRepository(db),
		// Evidence:  NewEvidenceRepository(db),
		// Exception: NewExceptionRepository(db),
	}
}
