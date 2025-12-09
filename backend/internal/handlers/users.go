package handlers

import (
	"net/http"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gin-gonic/gin"
	"github.com/patil-rushikesh/scm-backend/internal/models"
	"github.com/patil-rushikesh/scm-backend/internal/services"
	"github.com/patil-rushikesh/scm-backend/internal/utils"
)

type UserHandler struct {
	service services.UserService
}

func (h *UserHandler) Logout(c *gin.Context) {
	// Clear the cookie by setting MaxAge to -1
	c.SetCookie(
		"user_token",
		"",
		-1,
		"/",
		"",
		false, // Secure=false for local dev
		true,  // HttpOnly
	)
	utils.SuccessResponse(c, http.StatusOK, "Logged out successfully", nil)
}

func NewUserHandler(service services.UserService) *UserHandler {
	return &UserHandler{service: service}
}

func (h *UserHandler) Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	if err := h.service.RegisterUser(&user); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to register user", err)
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "User registered successfully", user)
}

func (h *UserHandler) Authenticate(c *gin.Context) {
	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&credentials); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid input", err)
		return
	}

	user, err := h.service.AuthenticateUser(credentials.Email, credentials.Password)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Authentication failed", err)
		return
	}

	token, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to generate token", err)
		return
	}
	// For local development, set secure=false so cookies work over HTTP
	c.SetCookie(
		"user_token",
		token,
		3600,
		"/",
		"",
		false, // Secure=false for local dev (set true for production/HTTPS)
		true,  // HttpOnly (not accessible via JS)
	)

	// Return token in response
	utils.SuccessResponse(c, http.StatusOK, "User authenticated successfully", user)
}

func (h *UserHandler) GetProfile(c *gin.Context) {
	claims, exists := c.Get("user")
	if !exists {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	userClaims, ok := claims.(jwt.MapClaims)
	if !ok {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}

	userIDFloat, ok := userClaims["user_id"].(float64)

	if !ok {
		utils.ErrorResponse(c, http.StatusUnauthorized, "Unauthorized", nil)
		return
	}
	userID := uint(userIDFloat)
	user, err := h.service.GetUserByID(userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to retrieve user profile", err)
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "User profile retrieved successfully", user)
}
