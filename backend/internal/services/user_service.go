package services

import (
	"errors"

	"github.com/patil-rushikesh/scm-backend/internal/models"
	"github.com/patil-rushikesh/scm-backend/internal/repository"
	"github.com/patil-rushikesh/scm-backend/internal/utils"
)

type UserService interface {
	RegisterUser(user *models.User) error
	AuthenticateUser(email, password string) (*models.User, error)
	GetUserByID(id uint) (*models.User, error)
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) RegisterUser(user *models.User) error {
	// Hash the password before storing
	hashed, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashed
	return s.repo.Create(user)
}

func (s *userService) AuthenticateUser(email, password string) (*models.User, error) {
	user, err := s.repo.GetByEmail(email)
	if err != nil {
		return nil, err
	}
	if !utils.CheckPasswordHash(password, user.Password) {
		return nil, errors.New("invalid credentials")
	}
	return user, nil
}

func (s *userService) GetUserByID(id uint) (*models.User, error) {
	return s.repo.GetByID(id)
}
