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
	Token string       `json:"token"`
	ID    uint         `json:"id"`
	Admin entity.Admin `json:"user"`
	Role  string       `json:"role"`
	Name  string       `json:"name"`
}

type UserRresponse struct {
	Token string      `json:"token"`
	ID    uint        `json:"id"`
	Admin entity.User `json:"user"`
	Role  string      `json:"role"`
	Name  string      `json:"name"`
}

func Signin(c *fiber.Ctx) error {
	var payload SigninPayload
	var signin entity.Signin
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	// - ค้นหาว่าใคร Signin เข้ามา
	if tx := entity.DB().Preload("Role").Raw("SELECT * FROM signins WHERE user = ?", payload.User).Find(&signin); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Not found"})
	}
	// - ถอดรหัส
	err := bcrypt.CompareHashAndPassword([]byte(signin.Pass), []byte(payload.Pass))
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Password Incorrect"})
	}
	// - Issuer เอาไว้ระบุ id ว่าเป็นใคร
	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}
	// - เก็บ Token
	signedToken, err := jwtWrapper.GenerateToken(signin.User)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Error signin token"})
	}
	// - เตรียมข้อมูล
	var roleadmin entity.Role
	var roleuser entity.Role
	entity.DB().Raw(`SELECT * FROM roles WHERE name = "ผู้ดูแลระบบ"`).Scan(&roleadmin)
	entity.DB().Raw(`SELECT * FROM roles WHERE name = "ผู้ดูแลระบบ"`).Scan(&roleuser)
	// - ตรวจสอบว่าเป็น Admin หรือ User
	if signin.Role.Name == roleadmin.Name {
		var admin entity.Admin
		if tx := entity.DB().Raw("SELECT * FROM admins WHERE signin_id = ?", signin.ID).Find(&admin); tx.RowsAffected == 0 {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Admin not found"})
		}
		tokenres := AdminResponse{
			Token: signedToken,
			ID:    admin.ID,
			Admin: admin,
			Role:  roleadmin.Name,
			Name:  admin.Firstname,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenres})
	} else if signin.Role.Name == roleuser.Name {
		var user entity.User
		if tx := entity.DB().Raw("SELECT * FROM users WHERE signin_id = ?", signin.ID).Find(&user); tx.RowsAffected == 0 {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
		}
		tokenres := UserRresponse{
			Token: signedToken,
			ID:    user.ID,
			Admin: user,
			Role:  roleuser.Name,
			Name:  user.Firstname,
		}
		c.Status(http.StatusOK).JSON(fiber.Map{"data": tokenres})
	}
	return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Unexpected error"})
}
