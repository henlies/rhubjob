package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func UpdateDetailServiceUser(c *fiber.Ctx) error {
	var user entity.ServiceUser
	var prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	if tx := entity.DB().Where("id = ?", user.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Prefix not found"})
	}
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Gender not found"})
	}
	if tx := entity.DB().Where("id = ?", user.BloodID).First(&blood); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Blood not found"})
	}

	uu := entity.ServiceUser{
		PersonalID: user.PersonalID,
		Prefix:     prefix,
		Firstname:  user.Firstname,
		Lastname:   user.Lastname,
		Nickname:   user.Nickname,
		Gender:     gender,
		Phone:      user.Phone,
		Email:      user.Email,
		Line:       user.Line,
		Birth:      user.Birth,
		Blood:      blood,
		Descript:   user.Descript,
		Pic:        user.Pic,
	}
	if err := entity.DB().Where("id = ?", user.ID).Updates(&uu).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": uu})
}

// In Use
func GetServiceUserByUID(c *fiber.Ctx) error {
	var user entity.ServiceUser
	id := c.Params("id")
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").
		Preload("Pet.Type").Preload("Pet.Gene").Preload("Role").Preload("Address.Province").
		Preload("Address.District").Raw("SELECT * FROM service_users WHERE id = ?", id).Find(&user).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}

func DeleteServiceUser(c *fiber.Ctx) error {
	user := c.Params("user")
	if tx := entity.DB().Exec("UPDATE service_users SET active = 0 WHERE user = ?", user); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}

func ActiveServiceUser(c *fiber.Ctx) error {
	user := c.Params("user")
	if tx := entity.DB().Exec("UPDATE service_users SET active = 1 WHERE user = ?", user); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": user})
}

func CreateUserSigninUse(c *fiber.Ctx) error {
	var user entity.ServiceUser
	var role entity.Role
	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", user.RoleID).First(&role); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Role not found"})
	}

	cus := entity.ServiceUser{
		User:   user.User,
		Pass:   SetupPasswordHash(user.Pass),
		Role:   role,
		Status: 1,
		Active: 1,
	}
	if err := entity.DB().Create(&cus).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": cus})
}
