package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListComments(c *fiber.Ctx) error {
	var comments []entity.Comment
	if err := entity.DB().Raw("SELECT * FROM comments").Find(&comments).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": comments})
}
