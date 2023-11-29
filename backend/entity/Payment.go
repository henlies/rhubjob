package entity

import (
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	MethodID uint `json:"method_id"`
	// Post     []Post `gorm:"foreignKey:PaymentID"`
}
