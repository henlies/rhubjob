package entity

import (
	"gorm.io/gorm"
)

type Address struct {
	gorm.Model
	ProvinceID uint
	Province   Province `gorm:"references:id"`
	DistrictID uint
	District   District `gorm:"references:id"`
	Descript   string   `json:"descript"`
	User       []User   `gorm:"foreignKey:AddressID"`
}
