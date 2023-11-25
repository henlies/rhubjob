package entity

import (
	"gorm.io/gorm"
)

// - ตารางหลัก Admin
type Admin struct {
	gorm.Model
	PrefixID  int
	Prefix    Prefix `gorm:"references:id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	GenderID  uint
	Gender    Gender `gorm:"references:id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	BloodID   uint
	Blood     Blood `gorm:"references:id"`
	PerID     uint
	Per       Per    `gorm:"references:id"`
	Pic       string `json:"pic"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	RoleID    uint
	Role      Role `gorm:"references:ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusa int `gorm:"statusa"`
}
