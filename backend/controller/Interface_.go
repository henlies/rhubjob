package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListAllofUser(c *fiber.Ctx) error {
	var users []entity.ServiceUser
	rawQuery := `
			SELECT id, 
			role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_users
			UNION 
			SELECT id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_providers
		`
	if err := entity.DB().Raw(rawQuery).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}

func ListAllofuser(c *fiber.Ctx) error {
	var users []entity.ServiceUser
	if err := entity.DB().Raw(`SELECT * FROM service_users`).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}

func ListAllofDog(c *fiber.Ctx) error {
	var pet []entity.Pet
	if err := entity.DB().Raw("SELECT * FROM pets where type_id = 1").Find(&pet).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": pet})
}

func ListAllofCat(c *fiber.Ctx) error {
	var pet []entity.Pet
	if err := entity.DB().Raw("SELECT * FROM pets where type_id = 2").Find(&pet).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": pet})
}

func ListAllofprovider(c *fiber.Ctx) error {
	var users []entity.ServiceProvider
	if err := entity.DB().Raw(`SELECT * FROM service_providers`).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}

func ListAllofPostDog(c *fiber.Ctx) error {
	var post []entity.Post
	if err := entity.DB().Raw(`SELECT * FROM posts WHERE type_id = 1 and status_id NOT IN (4, 5, 6)`).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func ListAllofPostCat(c *fiber.Ctx) error {
	var post []entity.Post
	if err := entity.DB().Raw(`SELECT * FROM posts WHERE type_id = 2`).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func RateID(c *fiber.Ctx) error {
	var result struct {
		TotalRate int `json:"total_rate"`
	}
	id := c.Params("id")
	if err := entity.DB().Raw(`SELECT SUM(rate) as total_rate FROM posts WHERE service_provider_id = ?`, id).Scan(&result).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": result})
}

func CountID(c *fiber.Ctx) error {
	var posts []entity.Post
	id := c.Params("id")
	if err := entity.DB().Raw(`SELECT * FROM posts WHERE service_provider_id = ? AND rate != 0`, id).Find(&posts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": posts})
}
