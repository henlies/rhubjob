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

func GetPostShow(c *fiber.Ctx) error {
	var post []entity.Post
	rawQuery := `
			SELECT * FROM posts WHERE service_user_id = 0 AND status_id = 1
		`
	if err := entity.DB().Preload("ServiceProvider").Preload("Status").
		Preload("Type").Raw(rawQuery).Find(&post).Error; err != nil {
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
	return GetPostShowByIDAndStatus(c, 4)
}

func GetPostShowIDstatus5(c *fiber.Ctx) error {
	return GetPostShowByIDAndStatus(c, 5)
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

func AcceptPost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 3 WHERE id = ?", id); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": id})
}

func NonAcceptPost(c *fiber.Ctx) error {
	id := c.Params("id")
	if tx := entity.DB().Exec("UPDATE posts SET status_id = 1 WHERE id = ?", id); tx.RowsAffected == 0 {
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

func GetPostChart(c *fiber.Ctx) error {
	rawQuery := `
			SELECT
			CASE status_id
				WHEN 1 THEN 'รอเริ่มงาน'
				WHEN 2 THEN 'รอการยืนยัน'
				WHEN 3 THEN 'ดำเนินงาน'
				WHEN 4 THEN 'งานสิ้นสุด'
				WHEN 5 THEN 'ยกเลิกงาน'
				ELSE 'ลบโพส'
			END AS status,
			COUNT(*) AS value
			FROM posts p
			LEFT JOIN (SELECT DISTINCT name, id FROM statuses) s ON p.status_id = s.id
			GROUP BY s.name
			ORDER BY p.status_id
		`
	rows, err := entity.DB().Raw(rawQuery).Rows()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error executing query"})
	}
	defer rows.Close()

	var result []map[string]interface{}
	for rows.Next() {
		var status string
		var value int
		if err := rows.Scan(&status, &value); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Error scanning rows"})
		}
		result = append(result, map[string]interface{}{"status": status, "value": value})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"data": result})
}
