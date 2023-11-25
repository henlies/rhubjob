package entity

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Descript string  `json:"descript"`
	Lati     float64 `json:"lati"`
	Long     float64 `json:"long"`
	StatusID uint
	Status   Status `gorm:"references:ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusp int `gorm:"statusp"`
}
