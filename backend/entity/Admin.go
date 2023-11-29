package entity

import (
	"gorm.io/gorm"
)

// - ตารางหลัก Admin
type Admin struct {
	gorm.Model
	PrefixID  uint   `json:"prefix_id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	GenderID  uint   `json:"gender_id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	BloodID   uint   `json:"blood_id"`
	PerID     uint   `json:"per_id"`
	Pic       string `json:"pic"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	RoleID    uint   `json:"role_id"`
	Role      Role   `gorm:"references:id"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusa int `gorm:"statusa"`
}
