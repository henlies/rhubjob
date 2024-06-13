package entity

import (
	"time"

	"gorm.io/gorm"
)

// ===== Use in Admin =====
type Per struct {
	gorm.Model
	Role  string  `json:"Role"`
	Admin []Admin `gorm:"foreignKey:PerID"`
}

// ===== Use in Admin&User =====
type Prefix struct {
	gorm.Model
	Name            string            `json:"Name"`
	ServiceUser     []ServiceUser     `gorm:"foreignKey:PrefixID"`
	ServiceProvider []ServiceProvider `gorm:"foreignKey:PrefixID"`
	Admin           []Admin           `gorm:"foreignKey:PrefixID"`
}

type Gender struct {
	gorm.Model
	Name            string            `json:"Name"`
	ServiceUser     []ServiceUser     `gorm:"foreignKey:GenderID"`
	ServiceProvider []ServiceProvider `gorm:"foreignKey:GenderID"`
	Admin           []Admin           `gorm:"foreignKey:GenderID"`
}

type Blood struct {
	gorm.Model
	Name            string            `json:"Name"`
	ServiceUser     []ServiceUser     `gorm:"foreignKey:BloodID"`
	ServiceProvider []ServiceProvider `gorm:"foreignKey:BloodID"`
	Admin           []Admin           `gorm:"foreignKey:BloodID"`
}

type Role struct {
	gorm.Model
	Name            string            `json:"Name"`
	ServiceUser     []ServiceUser     `gorm:"foreignKey:RoleID"`
	ServiceProvider []ServiceProvider `gorm:"foreignKey:RoleID"`
	Admin           []Admin           `gorm:"foreignKey:RoleID"`
}

// ===== Use in Pet =====
type Gene struct {
	gorm.Model
	Name   string `json:"Name"`
	TypeID uint   `json:"TypeID"`
	Type   Type   `gorm:"references:ID" json:"Type"`
	Pet    []Pet  `gorm:"foreignKey:GeneID"`
}

type Type struct {
	gorm.Model
	Name string `json:"Name"`
	Gene []Gene `gorm:"foreignKey:TypeID"`
	Pet  []Pet  `gorm:"foreignKey:TypeID"`
	Post []Post `gorm:"foreignKey:TypeID"`
}

// ===== Use in Address =====
type District struct {
	gorm.Model
	Name       string    `json:"Name"`
	Zipcode    string    `json:"Zipcode"`
	ProvinceID uint      `json:"ProvinceID"`
	Province   Province  `gorm:"references:ID" json:"Province"`
	Address    []Address `gorm:"foreignKey:DistrictID"`
}

type Province struct {
	gorm.Model
	Name     string     `json:"Name"`
	District []District `gorm:"foreignKey:ProvinceID"`
	Address  []Address  `gorm:"foreignKey:ProvinceID"`
}

// ===== Use in Post =====
type Status struct {
	gorm.Model
	Name string `json:"Name"`
	Post []Post `gorm:"foreignKey:StatusID"`
}

// ===== Use in Post =====
type Notify struct {
	gorm.Model
	Text    string    `json:"Text"`
	Date    time.Time `json:"Date"`
	Health  string    `json:"Health"`
	Clean   string    `json:"Clean"`
	Post_ID uint      `json:"Post_ID"`
	Post    Post      `gorm:"references:ID" json:"Post"`
}
