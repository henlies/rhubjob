package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

// in case service_user
func ShowNotifyCaseByUID(c *fiber.Ctx) error {
	id := c.Params("id")
	var notify []entity.Notify
	if err := entity.DB().Preload("Post").Raw("SELECT * FROM notifies WHERE post_id = (SELECT id FROM posts WHERE service_user_id = ? AND (status_id = 3 OR (status_id = 4 AND rate = 0) OR (status_id = 5 AND rate = 0)))", id).Find(&notify).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": notify})
}

// history service_user
func ShowHistoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var notify []entity.Notify
	if err := entity.DB().Raw("SELECT * FROM notifies WHERE post_id = ?", id).Find(&notify).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": notify})
}

// history service_provider
func ShowNotifyHistoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var notify []entity.Notify
	if err := entity.DB().Preload("Post.Status").Raw("SELECT * FROM notifies WHERE post_id = (SELECT id from posts WHERE id = ?)", id).Find(&notify).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": notify})
}

// history check service_provider
func ShowNotifyCheckHistoryByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var notify entity.Notify
	if err := entity.DB().Preload("Post.Status").Raw("SELECT * FROM notifies WHERE post_id = (SELECT id from posts WHERE id = ?)", id).Find(&notify).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": notify})
}

func CreateNotify(c *fiber.Ctx) error {
	var notify entity.Notify
	if err := c.BodyParser(&notify); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	cn := entity.Notify{
		Text:    notify.Text,
		Date:    notify.Date,
		Health:  notify.Health,
		Clean:   notify.Clean,
		Post_ID: notify.Post_ID,
	}
	if err := entity.DB().Create(&cn).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": cn})
}
