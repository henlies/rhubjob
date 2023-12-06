package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func ListPrefixes(c *fiber.Ctx) error {
	var prefixes []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM prefixes").Find(&prefixes).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": prefixes})
}

func ListGenders(c *fiber.Ctx) error {
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Find(&genders).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": genders})
}

func ListBloods(c *fiber.Ctx) error {
	var bloods []entity.Blood
	if err := entity.DB().Raw("SELECT * FROM bloods").Find(&bloods).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": bloods})
}

func ListPers(c *fiber.Ctx) error {
	var pers []entity.Per
	if err := entity.DB().Raw("SELECT * FROM pers").Find(&pers).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": pers})
}

func ListTypes(c *fiber.Ctx) error {
	var types []entity.Type
	if err := entity.DB().Raw("SELECT * FROM types").Find(&types).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": types})
}

func ListGenes(c *fiber.Ctx) error {
	var genes []entity.Gene
	if err := entity.DB().Raw("SELECT * FROM genes").Find(&genes).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": genes})
}

func ListProvinces(c *fiber.Ctx) error {
	var provinces []entity.Province
	if err := entity.DB().Raw("SELECT * FROM provinces").Find(&provinces).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": provinces})
}

func ListDistricts(c *fiber.Ctx) error {
	var districts []entity.District
	if err := entity.DB().Raw("SELECT * FROM districts").Find(&districts).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": districts})
}

func ListStatuses(c *fiber.Ctx) error {
	var statuses []entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses").Find(&statuses).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": statuses})
}
func ListRoles(c *fiber.Ctx) error {
	var roles []entity.Role
	if err := entity.DB().Raw("SELECT * FROM roles").Find(&roles).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": roles})
}
func ListMethods(c *fiber.Ctx) error {
	var methods []entity.Method
	if err := entity.DB().Raw("SELECT * FROM statuses").Find(&methods).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": methods})
}

func ListUserComments(c *fiber.Ctx) error {
	var usercomments []entity.UserComment
	if err := entity.DB().Raw("SELECT * FROM user_comments").Find(&usercomments).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": usercomments})
}

func ListUserChats(c *fiber.Ctx) error {
	var userchats []entity.UserChat
	if err := entity.DB().Raw("SELECT * FROM user_chats").Find(&userchats).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": userchats})
}
