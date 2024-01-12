package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListAddresses(c *fiber.Ctx) error {
	var addresses []entity.Address
	if err := entity.DB().Preload("Province").Preload("District").Raw("SELECT * FROM addresses").Find(&addresses).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": addresses})
}

func GetAddressUID(c *fiber.Ctx) error {
	var address entity.Address
	id := c.Params("id")
	if err := entity.DB().Preload("Province").Preload("District").Raw("SELECT * FROM addresses Where id = (select address_id from users where id = ?)", id).Find(&address).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": address})
}

func CreateAddress(c *fiber.Ctx) error {
	var address entity.Address
	var province entity.Province
	var district entity.District
	if err := c.BodyParser(&address); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", address.ProvinceID).First(&province); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Province not found"})
	}
	if tx := entity.DB().Where("id = ?", address.DistrictID).First(&district); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "District not found"})
	}

	ca := entity.Address{
		ProvinceID: province.ID,
		DistrictID: district.ID,
		Descript:   address.Descript,
	}
	if err := entity.DB().Create(&ca).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": ca})
}

func UpdateAddress(c *fiber.Ctx) error {
	var address entity.Address
	var province entity.Province
	var district entity.District
	if err := c.BodyParser(&address); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", address.ProvinceID).First(&province); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Province not found"})
	}
	if tx := entity.DB().Where("id = ?", address.DistrictID).First(&district); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "District not found"})
	}

	ua := entity.Address{
		ProvinceID: province.ID,
		DistrictID: district.ID,
		Descript:   address.Descript,
	}
	if err := entity.DB().Where("id = ?", address.ID).Updates(&ua).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": ua})
}
