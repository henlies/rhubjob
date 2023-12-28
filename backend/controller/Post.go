package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func GetPostbyId(c *fiber.Ctx) error {
	var posts entity.Post
	id := c.Params("id")
	if err := entity.DB().Raw("SELECT * FROM posts WHERE id = ?", id).Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}

func ListPostStart(c *fiber.Ctx) error {
	var posts []entity.Post
	if err := entity.DB().Preload("User1.Pet.Gene.Type").Preload("Status").Raw("SELECT * FROM posts WHERE status_id = 1").Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}

func ListPostStartId(c *fiber.Ctx) error {
	var posts []entity.Post
	id := c.Params("id")
	if err := entity.DB().Preload("User1.Pet.Gene.Type").Preload("Status").Raw("SELECT * FROM posts WHERE status_id = 1 AND user1_id = ?", id).Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}

func ListPostIdTrack(c *fiber.Ctx) error {
	var posts []entity.Post
	id := c.Params("id")
	if err := entity.DB().Preload("User2").Preload("User1.Pet.Gene.Type").Preload("Status").Raw("SELECT * FROM posts WHERE (status_id != 1 AND status_id != 4) AND user1_id = ?", id).Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}

func ListPostIdStatus(c *fiber.Ctx) error {
	var posts []entity.Post
	id := c.Params("id")
	if err := entity.DB().Preload("User2").Preload("User1.Pet.Gene.Type").Preload("Status").Raw("SELECT * FROM posts WHERE (status_id != 1 AND status_id != 4) AND user2_id = ?", id).Find(&posts).Error; err != nil {
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

func UpdatePost(c *fiber.Ctx) error {
	var post entity.Post

	if err := c.BodyParser(&post); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	up := entity.Post{
		Descript: post.Descript,
		Lati:     post.Lati,
		Long:     post.Long,
		Start:    post.Start,
		End:      post.End,
		Price:    post.Price,
	}

	if err := entity.DB().Where("id = ?", post.ID).Updates(&up).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": up})
}

func AcceptPost(c *fiber.Ctx) error {
	var post entity.Post
	var user2 entity.User

	if err := c.BodyParser(&post); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", post.User2ID).First(&user2); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}

	ap := entity.Post{
		StatusID: 2,
		User2:    user2,
	}

	if err := entity.DB().Where("id = ?", post.ID).Updates(&ap).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": ap})
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 4 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Post not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}
