package entity

import (
	"gorm.io/gorm"
)

type Address struct {
	gorm.Model
	Descript        string            `json:"Descript"`
	ProvinceID      uint              `json:"ProvinceID"`
	Province        Province          `gorm:"references:ID" json:"Province"`
	DistrictID      uint              `json:"DistrictID"`
	District        District          `gorm:"references:ID" json:"District"`
	ServiceUser     []ServiceUser     `gorm:"foreignKey:AddressID"`
	ServiceProvider []ServiceProvider `gorm:"foreignKey:AddressID"`
}
