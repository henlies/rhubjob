package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	PrefixID    uint          `json:"prefix_id"`
	Firstname   string        `json:"firstname"`
	Lastname    string        `json:"lastname"`
	Nickname    string        `json:"nickname"`
	GenderID    uint          `json:"gender_id"`
	Phone       string        `json:"phone"`
	AddressID   uint          `json:"address_id"`
	Email       string        `json:"email"`
	Birth       time.Time     `json:"birth"`
	BloodID     uint          `json:"blood_id"`
	PetID       uint          `json:"pet_id"`
	Descript    string        `json:"descript"`
	Pic         string        `json:"pic"`
	User        string        `json:"user"`
	Pass        string        `json:"pass"`
	RoleID      uint          `json:"role_id"`
	Role        Role          `gorm:"references:id"`
	UserChat    []UserChat    `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID" json:"user_chat"`
	UserComment []UserComment `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID" json:"user_comment"`
	UserPost    []UserPost    `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID" json:"user_post"`
	Statusu     int           `json:"statusu"`
}
