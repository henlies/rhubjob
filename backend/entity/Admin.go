package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	PersonalID uint   `json:"PersonalID"`
	PrefixID   uint   `json:"PrefixID"`
	Prefix     Prefix `gorm:"references:id" json:"Prefix"`
	Firstname  string `json:"Firstname"`
	Lastname   string `json:"Lastname"`
	Nickname   string `json:"Nickname"`
	GenderID   uint   `json:"GenderID"`
	Gender     Gender `gorm:"references:id" json:"Gender"`
	Phone      string `json:"Phone"`
	Email      string `json:"Email"`
	BloodID    uint   `json:"BloodID"`
	Blood      Blood  `gorm:"references:id" json:"Blood"`
	PerID      uint   `json:"PerID"`
	Per        Per    `gorm:"references:id" json:"Per"`
	Pic        string `json:"Pic"`
	User       string `json:"User"`
	Pass       string `json:"Pass"`
	RoleID     uint   `json:"RoleID"`
	Role       Role   `gorm:"references:id" json:"Role"`
	Status     int    `gorm:"Status"`
	Active     int    `json:"Active"`
}
