package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func GetPostbyId(c *fiber.Ctx) error {
	var post entity.Post
	id := c.Params("id")
	rawQuery := `
			SELECT * FROM posts WHERE id = ?
		`
	if err := entity.DB().Preload("Type").
		Raw(rawQuery, id).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func GetPostbyPId(c *fiber.Ctx) error {
	var post []entity.Post
	id := c.Params("id")
	rawQuery := `
			SELECT * FROM posts WHERE id = ?
		`
	if err := entity.DB().Preload("ServiceProvider.Address.District.Province").Preload("Status").
		Preload("Type").Preload("ServiceUser.Address.District.Province").Preload("ServiceUser.Pet.Gene.Type").
		Preload("ServiceUser.Prefix").Preload("ServiceProvider.Prefix").Raw(rawQuery, id).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func GetPostShowByIDAndStatus(c *fiber.Ctx, statusID int) error {
	var post []entity.Post
	id := c.Params("id")
	rawQuery := `
		SELECT * FROM posts WHERE status_id = ? AND service_provider_id = ? 
	`

	if err := entity.DB().Preload("ServiceUser").Preload("ServiceProvider").Preload("Status").
		Preload("Type").Raw(rawQuery, statusID, id).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func GetPostShowIDstatus1(c *fiber.Ctx) error {
	return GetPostShowByIDAndStatus(c, 1)
}

func GetPostShowIDstatus2(c *fiber.Ctx) error {
	return GetPostShowByIDAndStatus(c, 2)
}

func GetPostShowIDstatus3(c *fiber.Ctx) error {
	return GetPostShowByIDAndStatus(c, 3)
}

func GetPostShowIDstatus4(c *fiber.Ctx) error {
	var post []entity.Post
	id := c.Params("id")
	rawQuery := `
		SELECT * FROM posts WHERE status_id IN (4, 5, 6) AND service_provider_id = ? 
	`

	if err := entity.DB().Preload("ServiceUser").Preload("ServiceProvider").Preload("Status").
		Preload("Type").Raw(rawQuery, id).Find(&post).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"data": post})
}

func CreatePost(c *fiber.Ctx) error {
	var post entity.Post
	var ser_pro entity.ServiceProvider
	var status entity.Status
	if err := c.BodyParser(&post); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", post.Service_ProviderID).First(&ser_pro); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Ser_pro not found"})
	}
	if tx := entity.DB().Where("id = ?", post.StatusID).First(&status); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Status not found"})
	}

	cp := entity.Post{
		Descript:        post.Descript,
		Start:           post.Start,
		End:             post.End,
		Price:           post.Price,
		TypeID:          post.TypeID,
		ServiceProvider: ser_pro,
		Status:          status,
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
		Start:    post.Start,
		End:      post.End,
		Price:    post.Price,
		TypeID:   post.TypeID,
	}

	if err := entity.DB().Where("id = ?", post.ID).Updates(&up).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": up})
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 6 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}

func CanclePost(c *fiber.Ctx) error {
	var post entity.Post
	if err := c.BodyParser(&post); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	cp := entity.Post{
		Note:     post.Note,
		StatusID: 5,
	}

	if err := entity.DB().Where("id = ?", post.ID).Updates(&cp).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": cp})
}

func FinishPost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 4 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}

func AcceptPost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 3 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}

func NonAcceptPost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET service_user_id = 0, status_id = 1 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}
