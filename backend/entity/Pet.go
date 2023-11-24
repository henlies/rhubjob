package entity

import (
	"gorm.io/gorm"
)

type Pet struct {
	gorm.Model
	Name     string `json:"name"`
	TypeID   uint
	Type     Type `gorm:"references:id"`
	GeneID   uint
	Gene     Gene   `gorm:"references:id"`
	Food     string `json:"food"`
	Habit    string `json:"habit"`
	Descript string `json:"descript"`
	Pill     string `json:"pill"`
	Pic      string `json:"pic"`
	User     []User `gorm:"foreignKey:PetID"`
}
