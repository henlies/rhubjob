package entity

import (
	"gorm.io/gorm"
)

type Pet struct {
	gorm.Model
	Name     string `json:"name"`
	TypeID   uint   `json:"type_id"`
	GeneID   uint   `json:"gene_id"`
	Food     string `json:"food"`
	Habit    string `json:"habit"`
	Descript string `json:"descript"`
	Pill     string `json:"pill"`
	Pic      string `json:"pic"`
	User     []User `gorm:"foreignKey:PetID"`
}
