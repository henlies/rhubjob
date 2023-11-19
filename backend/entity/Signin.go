package entity

import (
	"gorm.io/gorm"
)

// - แยก Role
type Role struct {
	gorm.Model
	Name   string   `json:"name"`
	Signin []Signin `gorm:"foreignKey:RoleID"`
}

// - ตารางหลัก Signin
type Signin struct {
	gorm.Model
	User   string `json:"user"`
	Pass   string `json:"pass"`
	RoleID int
	Role   Role `gorm:"references:ID"`
}
