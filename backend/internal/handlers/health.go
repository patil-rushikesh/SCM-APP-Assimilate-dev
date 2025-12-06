package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/patil-rushikesh/scm-backend/internal/utils"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	utils.SuccessResponse(c, http.StatusOK, "Service is healthy", gin.H{
		"status": "ok",
		"service": "scm-backend",
	})
}
