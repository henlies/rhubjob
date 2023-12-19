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
	Token  string       `json:"token"`
	ID     uint         `json:"id"`
	Admin  entity.Admin `json:"user"`
	Role   string       `json:"role"`
	Per    string       `json:"per"`
	Name   string       `json:"name"`
	Active int          `json:"active"`
	Status int          `json:"status"`
}

type UserResponse struct {
	Token  string      `json:"token"`
	ID     uint        `json:"id"`
	User   entity.User `json:"user"`
	Role   string      `json:"role"`
	Name   string      `json:"name"`
	Active int         `json:"active"`
	Status int         `json:"status"`
}

func Signin(c *fiber.Ctx) error {
	var payload SigninPayload
	var user entity.User
	var admin entity.Admin
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	// - ค้นหาว่าใคร Signin เข้ามา
	if tx := entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE user = ?", payload.User).Find(&user); tx.RowsAffected == 0 {
		// - ถ้าไม่ใช่ User ให้เช็ค Admin
		if tx := entity.DB().Preload("Role").Preload("Per").Raw("SELECT * FROM admins WHERE user = ?", payload.User).Find(&admin); tx.RowsAffected == 0 {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Not found"})
		}
	}
	// - ถอดรหัส
	var role entity.Role
	var per entity.Per
	var userID uint
	var name string
	var active int
	var status int

	if user.ID != 0 {
		role = user.Role
		userID = user.ID
		name = user.Firstname
		active = user.Active
		status = user.Status
		err := bcrypt.CompareHashAndPassword([]byte(user.Pass), []byte(payload.Pass))
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
			Token:  signedToken,
			ID:     userID,
			Admin:  admin,
			Role:   role.Name,
			Per:    per.Role,
			Name:   name,
			Active: active,
			Status: status,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenRes})
	} else {
		tokenRes := UserResponse{
			Token:  signedToken,
			ID:     userID,
			User:   user,
			Role:   role.Name,
			Name:   name,
			Active: active,
			Status: status,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenRes})
	}

	return nil
}
