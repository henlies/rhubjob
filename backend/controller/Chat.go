package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListChats(c *fiber.Ctx) error {
	var chats []entity.Chat
	if err := entity.DB().Raw("SELECT * FROM chats").Find(&chats).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": chats})
}
