package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
	"github.com/henlies/project/service"
	"golang.org/x/crypto/bcrypt"
)

type SigninPayload struct {
	User string `json:"user"`
	Pass string `json:"pass"`
}

type AdminResponse struct {
	Token   string       `json:"token"`
	ID      uint         `json:"id"`
	Admin   entity.Admin `json:"user"`
	Role    string       `json:"role"`
	Per     string       `json:"per"`
	Name    string       `json:"name"`
	Active  int          `json:"active"`
	Status  int          `json:"status"`
	Pic     string       `json:"pic"`
	Pet     uint         `json:"pet"`
	Address uint         `json:"address"`
}

type ServiceUserResponse struct {
	Token   string             `json:"token"`
	ID      uint               `json:"id"`
	User    entity.ServiceUser `json:"user"`
	Role    string             `json:"role"`
	Name    string             `json:"name"`
	Active  int                `json:"active"`
	Status  int                `json:"status"`
	Pic     string             `json:"pic"`
	Pet     uint               `json:"pet"`
	Address uint               `json:"address"`
}

type ServiceProviderResponse struct {
	Token   string                 `json:"token"`
	ID      uint                   `json:"id"`
	User    entity.ServiceProvider `json:"user"`
	Role    string                 `json:"role"`
	Name    string                 `json:"name"`
	Active  int                    `json:"active"`
	Status  int                    `json:"status"`
	Pic     string                 `json:"pic"`
	Pet     uint                   `json:"pet"`
	Address uint                   `json:"address"`
}

func Signin(c *fiber.Ctx) error {
	var payload SigninPayload
	var serviceuser entity.ServiceUser
	var serviceprovider entity.ServiceProvider
	var admin entity.Admin
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	// - ค้นหาว่าใคร Signin เข้ามา
	if tx := entity.DB().Preload("Role").Preload("Pet").Preload("Address").Raw("SELECT * FROM service_users WHERE user = ?", payload.User).Find(&serviceuser); tx.RowsAffected == 0 {
		if tx := entity.DB().Preload("Role").Raw("SELECT * FROM service_providers WHERE user = ?", payload.User).Find(&serviceprovider); tx.RowsAffected == 0 {
			if tx := entity.DB().Preload("Role").Preload("Per").Raw("SELECT * FROM admins WHERE user = ?", payload.User).Find(&admin); tx.RowsAffected == 0 {
				return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Not found"})
			}
		}
	}

	// - ถอดรหัส
	var role entity.Role
	var per entity.Per
	var userID uint
	var name string
	var active int
	var status int
	var pic string

	var pet entity.Pet
	var address entity.Address

	if serviceuser.ID != 0 {
		role = serviceuser.Role
		userID = serviceuser.ID
		name = serviceuser.Firstname
		active = serviceuser.Active
		status = serviceuser.Status
		pic = serviceuser.Pic
		pet = serviceuser.Pet
		address = serviceuser.Address
		err := bcrypt.CompareHashAndPassword([]byte(serviceuser.Pass), []byte(payload.Pass))
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Password Incorrect"})
		}
	} else if serviceprovider.ID != 0 {
		role = serviceprovider.Role
		userID = serviceprovider.ID
		name = serviceprovider.Firstname
		active = serviceprovider.Active
		status = serviceprovider.Status
		pic = serviceprovider.Pic
		err := bcrypt.CompareHashAndPassword([]byte(serviceprovider.Pass), []byte(payload.Pass))
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Password Incorrect"})
		}
	} else {
		role = admin.Role
		per = admin.Per
		userID = admin.ID
		name = admin.Firstname
		active = admin.Active
		status = admin.Status
		pic = admin.Pic
		err := bcrypt.CompareHashAndPassword([]byte(admin.Pass), []byte(payload.Pass))
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Password Incorrect"})
		}
	}
	// - Issuer เอาไว้ระบุ id ว่าเป็นใคร
	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	// - เก็บ Token
	signedToken, err := jwtWrapper.GenerateToken(payload.User)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Error signin token"})
	}
	// - ตรวจสอบว่าเป็น Admin หรือ User
	if role.Name == "ผู้ดูแลระบบ" {
		tokenRes := AdminResponse{
			Token:   signedToken,
			ID:      userID,
			Admin:   admin,
			Role:    role.Name,
			Per:     per.Role,
			Name:    name,
			Active:  active,
			Status:  status,
			Pic:     pic,
			Pet:     pet.ID,
			Address: address.ID,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenRes})
	} else if role.Name == "ผู้ใช้ระบบ" {
		tokenRes := ServiceUserResponse{
			Token:   signedToken,
			ID:      userID,
			User:    serviceuser,
			Role:    role.Name,
			Name:    name,
			Active:  active,
			Status:  status,
			Pic:     pic,
			Pet:     pet.ID,
			Address: address.ID,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenRes})
	} else {
		tokenRes := ServiceProviderResponse{
			Token:   signedToken,
			ID:      userID,
			User:    serviceprovider,
			Role:    role.Name,
			Name:    name,
			Active:  active,
			Status:  status,
			Pic:     pic,
			Pet:     pet.ID,
			Address: address.ID,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenRes})
	}
	return nil
}
