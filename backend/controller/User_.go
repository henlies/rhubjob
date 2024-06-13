package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListUsersActive(c *fiber.Ctx) error {
	var users []entity.ServiceUser
	rawQuery := `
			SELECT id, 
			role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_users WHERE active = 1 
			UNION 
			SELECT id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_providers WHERE active = 1;
		`
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").
		Preload("Role").Raw(rawQuery).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}

func ListUsersNonactive(c *fiber.Ctx) error {
	var users []entity.ServiceUser
	rawQuery := `
			SELECT id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_users WHERE active = 0 
			UNION 
			SELECT id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, 
				   active, user
			FROM service_providers WHERE active = 0;
		`
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").
		Preload("Role").Raw(rawQuery).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}
