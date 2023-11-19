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
	GenderID  int
	Gender    Gender `gorm:"references:id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	Age       int    `json:"age"`
	BloodID   int
	Blood     Blood  `gorm:"references:id"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	PerID     int
	Per       Per    `gorm:"references:id"`
	Pic       string `json:"pic"`
	SigninID  int
	Signin    Signin `gorm:"references:id"`
}
