package repository

import (
	"github.com/patil-rushikesh/scm-backend/internal/models"
	"gorm.io/gorm"
)

type AssetRepository interface {
	Create(asset *models.Asset) error
	GetByID(id uint) (*models.Asset, error)
	GetAll() ([]models.Asset, error)
	Update(asset *models.Asset) error
	Delete(id uint) error
}

type assetRepository struct {
	db *gorm.DB
}

func NewAssetRepository(db *gorm.DB) AssetRepository {
	return &assetRepository{db: db}
}

func (r *assetRepository) Create(asset *models.Asset) error {
	return r.db.Create(asset).Error
}

func (r *assetRepository) GetByID(id uint) (*models.Asset, error) {
	var asset models.Asset
	err := r.db.Preload("Scans").First(&asset, id).Error
	return &asset, err
}

func (r *assetRepository) GetAll() ([]models.Asset, error) {
	var assets []models.Asset
	err := r.db.Find(&assets).Error
	return assets, err
}

func (r *assetRepository) Update(asset *models.Asset) error {
	return r.db.Save(asset).Error
}

func (r *assetRepository) Delete(id uint) error {
	return r.db.Delete(&models.Asset{}, id).Error
}
