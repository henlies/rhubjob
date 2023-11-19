package entity

import (
	"time"

	"gorm.io/gorm"
)

// - ตารางหลัก User
type User struct {
	gorm.Model
	PrefixID  int
	Prefix    Prefix `gorm:"references:id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	GenderID  int
	Gender    Gender    `gorm:"references:id"`
	Phone     string    `json:"phone"`
	Email     string    `json:"email"`
	Birth     time.Time `json:"Birth"`
	Age       int       `json:"age"`
	BloodID   int
	Blood     Blood  `gorm:"references:id"`
	Descript  string `json:"descript"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	Pic       string `json:"pic"`
	SigninID  int
	Signin    Signin `gorm:"references:id"`
}
