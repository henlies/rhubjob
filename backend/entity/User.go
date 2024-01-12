package entity

import (
	"time"

	"gorm.io/gorm"
)

type ServiceUser struct {
	gorm.Model
	PersonalID uint      `json:"PersonalID"`
	PrefixID   uint      `json:"PrefixID"`
	Prefix     Prefix    `gorm:"references:id" json:"Prefix"`
	Firstname  string    `json:"Firstname"`
	Lastname   string    `json:"Lastname"`
	Nickname   string    `json:"Nickname"`
	GenderID   uint      `json:"GenderID"`
	Gender     Gender    `gorm:"references:id" json:"Gender"`
	Phone      string    `json:"Phone"`
	AddressID  uint      `json:"AddressID"`
	Address    Address   `gorm:"references:id" json:"Address"`
	Email      string    `json:"Email"`
	Line       string    `json:"Line"`
	Birth      time.Time `json:"Birth"`
	BloodID    uint      `json:"BloodID"`
	Blood      Blood     `gorm:"references:id" json:"Blood"`
	PetID      uint      `json:"PetID"`
	Pet        Pet       `gorm:"references:id" json:"Pet"`
	Descript   string    `json:"Descript"`
	Pic        string    `json:"Pic"`
	User       string    `json:"User"`
	Pass       string    `json:"Pass"`
	RoleID     uint      `json:"RoleID"`
	Role       Role      `gorm:"references:id" json:"Role"`
	Post       []Post    `gorm:"foreignKey:Service_UserID"`
	Status     int       `json:"Status"`
	Active     int       `json:"Active"`
}

type ServiceProvider struct {
	gorm.Model
	PersonalID uint      `json:"PersonalID"`
	PrefixID   uint      `json:"PrefixID"`
	Prefix     Prefix    `gorm:"references:id" json:"Prefix"`
	Firstname  string    `json:"Firstname"`
	Lastname   string    `json:"Lastname"`
	Nickname   string    `json:"Nickname"`
	GenderID   uint      `json:"GenderID"`
	Gender     Gender    `gorm:"references:id" json:"Gender"`
	Phone      string    `json:"Phone"`
	AddressID  uint      `json:"AddressID"`
	Address    Address   `gorm:"references:id" json:"Address"`
	Email      string    `json:"Email"`
	Line       string    `json:"Line"`
	Birth      time.Time `json:"Birth"`
	BloodID    uint      `json:"BloodID"`
	Blood      Blood     `gorm:"references:id" json:"Blood"`
	Pic        string    `json:"Pic"`
	User       string    `json:"User"`
	Pass       string    `json:"Pass"`
	RoleID     uint      `json:"RoleID"`
	Role       Role      `gorm:"references:id" json:"Role"`
	Post       []Post    `gorm:"foreignKey:Service_ProviderID"`
	Status     int       `json:"Status"`
	Active     int       `json:"Active"`
}
