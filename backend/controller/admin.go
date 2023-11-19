package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListAdmins(c *fiber.Ctx) error {
	var admins []entity.Admin
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Per").Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": admins})
}
