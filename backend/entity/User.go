package entity

import (
	"time"

	"gorm.io/gorm"
)

// - ตารางหลัก User
type User struct {
	gorm.Model
	PrefixID  uint
	Prefix    Prefix `gorm:"references:id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	GenderID  uint
	Gender    Gender `gorm:"references:id"`
	Phone     string `json:"phone"`
	AddressID uint
	Address   Address   `gorm:"references:id"`
	Email     string    `json:"email"`
	Birth     time.Time `json:"Birth"`
	BloodID   uint
	Blood     Blood `gorm:"references:id"`
	PetID     uint
	Pet       Pet    `gorm:"references:id"`
	Descript  string `json:"descript"`
	Pic       string `json:"pic"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	RoleID    uint
	Role      Role `gorm:"references:ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusu int `gorm:"statusu"`
}
