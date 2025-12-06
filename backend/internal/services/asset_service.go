package services

import (
	"github.com/patil-rushikesh/scm-backend/internal/models"
	"github.com/patil-rushikesh/scm-backend/internal/repository"
)

type AssetService interface {
	CreateAsset(asset *models.Asset) error
	GetAsset(id uint) (*models.Asset, error)
	GetAllAssets() ([]models.Asset, error)
	UpdateAsset(asset *models.Asset) error
	DeleteAsset(id uint) error
}

type assetService struct {
	repo repository.AssetRepository
}

func NewAssetService(repo repository.AssetRepository) AssetService {
	return &assetService{repo: repo}
}

func (s *assetService) CreateAsset(asset *models.Asset) error {
	return s.repo.Create(asset)
}

func (s *assetService) GetAsset(id uint) (*models.Asset, error) {
	return s.repo.GetByID(id)
}

func (s *assetService) GetAllAssets() ([]models.Asset, error) {
	return s.repo.GetAll()
}

func (s *assetService) UpdateAsset(asset *models.Asset) error {
	return s.repo.Update(asset)
}

func (s *assetService) DeleteAsset(id uint) error {
	return s.repo.Delete(id)
}
