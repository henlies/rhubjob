package entity

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Descript           string          `json:"Descript"`
	Start              time.Time       `json:"Start"`
	End                time.Time       `json:"End"`
	Price              int             `json:"Price"`
	Service_UserID     uint            `json:"Service_UserID"`
	ServiceUser        ServiceUser     `gorm:"references:ID" json:"ServiceUser"`
	Service_ProviderID uint            `json:"Service_ProviderID"`
	ServiceProvider    ServiceProvider `gorm:"references:ID" json:"ServiceProvider"`
	StatusID           uint            `json:"StatusID"`
	Status             Status          `gorm:"references:ID" json:"Status"`
}
