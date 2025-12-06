package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/patil-rushikesh/scm-backend/internal/models"
	"github.com/patil-rushikesh/scm-backend/internal/services"
	"github.com/patil-rushikesh/scm-backend/internal/utils"
)

type AssetHandler struct {
	service services.AssetService
}

func NewAssetHandler(service services.AssetService) *AssetHandler {
	return &AssetHandler{service: service}
}

func (h *AssetHandler) CreateAsset(c *gin.Context) {
	var asset models.Asset
	if err := c.ShouldBindJSON(&asset); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	if err := h.service.CreateAsset(&asset); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create asset", err)
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Asset created successfully", asset)
}

func (h *AssetHandler) GetAsset(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid asset ID", err)
		return
	}

	asset, err := h.service.GetAsset(uint(id))
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Asset not found", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Asset retrieved successfully", asset)
}

func (h *AssetHandler) GetAllAssets(c *gin.Context) {
	assets, err := h.service.GetAllAssets()
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get assets", err)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Assets retrieved successfully", assets)
}
