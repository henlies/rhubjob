package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListPostStart(c *fiber.Ctx) error {
	var posts []entity.Post
	if err := entity.DB().Raw("SELECT * FROM posts WHERE status_id = 1").Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}

func CreatePost(c *fiber.Ctx) error {
	var post entity.Post
	var user entity.User
	if err := c.BodyParser(&post); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", post.User1ID).First(&user); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}

	cp := entity.Post{
		Descript: post.Descript,
		Lati:     post.Lati,
		Long:     post.Long,
		Start:    post.Start,
		End:      post.End,
		Price:    post.Price,
		User1:    user,
		StatusID: 1,
	}
	if err := entity.DB().Create(&cp).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": cp})
}
