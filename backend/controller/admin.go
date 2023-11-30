package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListAdmins(c *fiber.Ctx) error {
	var admins []entity.Admin
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Per").
		Preload("Role").Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": admins})
}

func GetAdmins(c *fiber.Ctx) error {
	var admin entity.Admin
	id := c.Params("id")
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Per").
		Preload("Role").Raw("SELECT * FROM admins WHERE id = ?", id).Find(&admin).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": admin})
}
