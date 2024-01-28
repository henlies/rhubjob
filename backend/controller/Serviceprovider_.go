package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

// In Use
func GetServiceProviderByUID(c *fiber.Ctx) error {
	var user entity.ServiceUser
	id := c.Params("id")
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").
		Preload("Pet.Type").Preload("Pet.Gene").Preload("Role").Preload("Address.Province").
		Preload("Address.District").Raw("SELECT * FROM service_users WHERE id = ?", id).Find(&user).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}

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

func CreateUserSigninJob(c *fiber.Ctx) error {
	var user entity.ServiceUser
	var role entity.Role
	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", user.RoleID).First(&role); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Role not found"})
	}

	cus := entity.ServiceUser{
		User:       user.User,
		Pass:       SetupPasswordHash(user.Pass),
		Firstname:  user.Firstname,
		Lastname:   user.Lastname,
		Role:       role,
		Email:      user.Email,
		Phone:      user.Phone,
		PersonalID: user.PersonalID,
		Status:     0,
		Active:     1,
	}
	if err := entity.DB().Create(&cus).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": cus})
}
