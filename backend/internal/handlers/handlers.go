package handlers

import "github.com/patil-rushikesh/scm-backend/internal/services"

type Handlers struct {
	Asset     *AssetHandler
	User      *UserHandler
	// Scan      *ScanHandler
	// Evidence  *EvidenceHandler
	// Exception *ExceptionHandler
	Health    *HealthHandler
}

func NewHandlers(services *services.Services) *Handlers {
	return &Handlers{
		Asset:     NewAssetHandler(services.Asset),
		User:      NewUserHandler(services.User),
		// Scan:      NewScanHandler(services.Scan),
		// Evidence:  NewEvidenceHandler(services.Evidence),
		// Exception: NewExceptionHandler(services.Exception),
		Health:    NewHealthHandler(),
	}
}
