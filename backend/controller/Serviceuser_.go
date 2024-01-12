package controller

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/entity"
)

func UpdateUser(c *fiber.Ctx) error {
	var user entity.ServiceUser
	var prefix entity.Prefix
	var gender entity.Gender
	var address entity.Address
	var blood entity.Blood
	var pet entity.Pet
	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if tx := entity.DB().Where("id = ?", user.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Prefix not found"})
	}
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Gender not found"})
	}
	if tx := entity.DB().Where("id = ?", user.AddressID).First(&address); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Address not found"})
	}
	if tx := entity.DB().Where("id = ?", user.BloodID).First(&blood); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Blood not found"})
	}
	if tx := entity.DB().Where("id = ?", user.PetID).First(&pet); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Pet not found"})
	}

	uu := entity.ServiceUser{
		Prefix:    prefix,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Nickname:  user.Nickname,
		Gender:    gender,
		Phone:     user.Phone,
		Email:     user.Email,
		Line:      user.Line,
		Birth:     user.Birth,
		Blood:     blood,
		Pet:       pet,
		Descript:  user.Descript,
		Pic:       user.Pic,
	}
	if err := entity.DB().Where("id = ?", user.ID).Updates(&uu).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": uu})
}

func UpdatePasswordUser(c *fiber.Ctx) error {
	var user entity.ServiceUser
	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	up := entity.ServiceUser{
		Pass: SetupPasswordHash(user.Pass),
	}
	if err := entity.DB().Where("id = ?", user.ID).Updates(&up).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": up})
}

func ListUsersActive(c *fiber.Ctx) error {
	var users []entity.ServiceUser
	rawQuery := `
			SELECT ROW_NUMBER() OVER (ORDER BY firstname) AS id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, active
			FROM service_users WHERE active = 1 
			UNION 
			SELECT ROW_NUMBER() OVER (ORDER BY firstname) AS id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, active
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
			SELECT ROW_NUMBER() OVER (ORDER BY firstname) AS id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, active
			FROM service_users WHERE active = 0 
			UNION 
			SELECT ROW_NUMBER() OVER (ORDER BY firstname) AS id, 
				   role_id, prefix_id, firstname, lastname, nickname, 
				   gender_id, phone, email, birth, blood_id, status, active
			FROM service_providers WHERE active = 0;
		`
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").
		Preload("Role").Raw(rawQuery).Find(&users).Error; err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": users})
}

func GetUser(c *fiber.Ctx) error {
	var user entity.ServiceUser
	id := c.Params("id")
	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Blood").Preload("Pet").
		Preload("Role").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
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
	email := c.Params("email")
	if tx := entity.DB().Exec("UPDATE service_providers SET active = 0 WHERE email = ?", email); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": email})
}

func DeleteServiceUser(c *fiber.Ctx) error {
	email := c.Params("email")
	if tx := entity.DB().Exec("UPDATE service_users SET active = 0 WHERE email = ?", email); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": email})
}

func ActiveServiceProvider(c *fiber.Ctx) error {
	email := c.Params("email")
	if tx := entity.DB().Exec("UPDATE service_providers SET active = 1 WHERE email = ?", email); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": email})
}

func ActiveServiceUser(c *fiber.Ctx) error {
	email := c.Params("email")
	if tx := entity.DB().Exec("UPDATE service_users SET active = 1 WHERE email = ?", email); tx.RowsAffected == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "User not found"})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"data": email})
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
