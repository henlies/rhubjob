package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
	"golang.org/x/crypto/bcrypt"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func ListPrefixes(c *fiber.Ctx) error {
	var pfx []entity.Prefix
	rawQuery := `
			SELECT * FROM prefixes
		`
	if err := entity.DB().Raw(rawQuery).Find(&pfx).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": pfx})
}

func ListGenders(c *fiber.Ctx) error {
	var gdr []entity.Gender
	rawQuery := `
			SELECT * FROM genders
		`
	if err := entity.DB().Raw(rawQuery).Find(&gdr).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": gdr})
}

func ListBloods(c *fiber.Ctx) error {
	var bd []entity.Blood
	rawQuery := `
			SELECT * FROM bloods
		`
	if err := entity.DB().Raw(rawQuery).Find(&bd).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": bd})
}

func ListTypes(c *fiber.Ctx) error {
	var typ []entity.Type
	rawQuery := `
			SELECT * FROM types
		`
	if err := entity.DB().Raw(rawQuery).Find(&typ).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": typ})
}

func ListGenes(c *fiber.Ctx) error {
	var gn []entity.Gene
	tid := c.Params("tid")
	rawQuery := `
			SELECT * FROM genes WHERE type_id = ?
		`
	if err := entity.DB().Raw(rawQuery, tid).Find(&gn).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": gn})
}

func ListProvinces(c *fiber.Ctx) error {
	var pvc []entity.Province
	rawQuery := `
			SELECT * FROM provinces
		`
	if err := entity.DB().Raw(rawQuery).Find(&pvc).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": pvc})
}

func ListDistricts(c *fiber.Ctx) error {
	var dtc []entity.District
	pid := c.Params("pid")
	rawQuery := `
			SELECT * FROM districts WHERE province_id = ?
		`
	if err := entity.DB().Raw(rawQuery, pid).Find(&dtc).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": dtc})
}

func GetZipcodeDID(c *fiber.Ctx) error {
	var dtc entity.District
	id := c.Params("id")
	rawQuery := `
			SELECT zipcode FROM districts WHERE id = ?
		`
	if err := entity.DB().Raw(rawQuery, id).Find(&dtc).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"data": dtc.Zipcode})
}
