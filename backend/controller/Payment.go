package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListPayments(c *fiber.Ctx) error {
	var payments []entity.Payment
	if err := entity.DB().Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": payments})
}
