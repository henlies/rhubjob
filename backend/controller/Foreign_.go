package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
	"golang.org/x/crypto/bcrypt"
)

// - ไว้เข้ารหัส
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

// ใช้เเล้ว
func ListRoles(c *fiber.Ctx) error {
	var roles []entity.Role
	if err := entity.DB().Raw("SELECT name, id FROM roles Where id = 2 OR id = 3").Find(&roles).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": roles})
}

func ListTypes(c *fiber.Ctx) error {
	var typ []entity.Type
	rawQuery := `
			SELECT * FROM types
		`
	if err := entity.DB().Raw(rawQuery).Find(&typ).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": typ})
}
