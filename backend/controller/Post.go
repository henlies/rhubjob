package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListPosts(c *fiber.Ctx) error {
	var posts []entity.Post
	if err := entity.DB().Raw("SELECT * FROM posts").Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}
