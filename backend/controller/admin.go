package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListAdmins(c *fiber.Ctx) error {
	var admins []entity.Admin
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Per").
		Preload("Role").Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": admins})
}

func GetAdmins(c *fiber.Ctx) error {
	var admin entity.Admin
	id := c.Params("id")
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Per").
		Preload("Role").Raw("SELECT * FROM admins WHERE id = ?", id).Find(&admin).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": admin})
}

func CreateAdmin(c *fiber.Ctx) error {
	var admin entity.Admin
	var prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood
	var per entity.Per
	if err := c.BodyParser(&admin); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", admin.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Prefix not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Gender not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.BloodID).First(&blood); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Blood not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.PerID).First(&per); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Permission not found"})
	}

	var adminrole entity.Role
	if err := entity.DB().Model(&entity.Role{}).Where("name = ?", "ผู้ดูแลระบบ").First(&adminrole).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Admin role not found"})
	}
	ca := entity.Admin{
		Prefix:    prefix,
		Firstname: admin.Firstname,
		Lastname:  admin.Lastname,
		Nickname:  admin.Nickname,
		Gender:    gender,
		Phone:     admin.Phone,
		Email:     admin.Email,
		Blood:     blood,
		Per:       per,
		Pic:       admin.Pic,
		User:      admin.User,
		Pass:      SetupPasswordHash(admin.Pass),
		Role:      adminrole,
		Statusa:   1,
	}
	if err := entity.DB().Create(&ca).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": ca})
}

func UpdateAdmin(c *fiber.Ctx) error {
	var admin entity.Admin
	var prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood
	var per entity.Per
	if err := c.BodyParser(&admin); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", admin.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Prefix not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Gender not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.BloodID).First(&blood); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Blood not found"})
	}
	if tx := entity.DB().Where("id = ?", admin.PerID).First(&per); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Permission not found"})
	}

	ua := entity.Admin{
		Prefix:    prefix,
		Firstname: admin.Firstname,
		Lastname:  admin.Lastname,
		Nickname:  admin.Nickname,
		Gender:    gender,
		Phone:     admin.Phone,
		Email:     admin.Email,
		Blood:     blood,
		Per:       per,
		Pic:       admin.Pic,
	}
	if err := entity.DB().Where("id = ?", admin.ID).Updates(&ua).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": ua})
}

func UpdatePasswordAdmin(c *fiber.Ctx) error {
	var admin entity.Admin
	if err := c.BodyParser(&admin); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	up := entity.Admin{
		Pass: SetupPasswordHash(admin.Pass),
	}
	if err := entity.DB().Where("id = ?", admin.ID).Updates(&up).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": up})
}

func DeleteAdmin(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE admins SET statusa = 0 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Admin not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}
