package services

import "github.com/patil-rushikesh/scm-backend/internal/repository"

type Services struct {
	User      UserService
	Asset     AssetService
	// Scan      ScanService
	// Evidence  EvidenceService
	// Exception ExceptionService
}

func NewServices(repos *repository.Repositories) *Services {
	return &Services{
		User:      NewUserService(repos.User),
		Asset:     NewAssetService(repos.Asset),
		// Scan:      NewScanService(repos.Scan),
		// Evidence:  NewEvidenceService(repos.Evidence),
		// Exception: NewExceptionService(repos.Exception),
	}
}
