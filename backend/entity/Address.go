package entity

import (
	"gorm.io/gorm"
)

type Address struct {
	gorm.Model
	ProvinceID uint   `json:"province_id"`
	DistrictID uint   `json:"district_id"`
	Descript   string `json:"descript"`
	User       []User `gorm:"foreignKey:AddressID"`
}
