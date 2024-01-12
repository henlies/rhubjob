package entity

import (
	"gorm.io/gorm"
)

type Pet struct {
	gorm.Model
	Name        string        `json:"Name"`
	TypeID      uint          `json:"TypeID"`
	Type        Type          `gorm:"references:ID" json:"Type"`
	GeneID      uint          `json:"GeneID"`
	Gene        Gene          `gorm:"references:ID" json:"Gene"`
	Food        string        `json:"Food"`
	Habit       string        `json:"Habit"`
	Descript    string        `json:"Descript"`
	Pill        string        `json:"Pill"`
	Pic         string        `json:"Pic"`
	ServiceUser []ServiceUser `gorm:"foreignKey:PetID"`
}
