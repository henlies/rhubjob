package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ApproveUser(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE service_providers SET status = 1 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}

func DeleteServiceProvider(c *fiber.Ctx) error {
	user := c.Params("user")
	if tx := entity.DB().Exec("UPDATE service_providers SET active = 0 WHERE user = ?", user); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}

func ActiveServiceProvider(c *fiber.Ctx) error {
	user := c.Params("user")
	if tx := entity.DB().Exec("UPDATE service_providers SET active = 1 WHERE user = ?", user); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}
