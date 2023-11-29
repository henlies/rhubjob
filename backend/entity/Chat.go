package entity

import (
	"gorm.io/gorm"
)

type Chat struct {
	gorm.Model
	Message  string     `json:"message"`
	UserChat []UserChat `gorm:"foreignKey:ChatID"`
}

type UserChat struct {
	gorm.Model
	User1ID uint `json:"user1_id"`
	User2ID uint `json:"user2_id"`
	ChatID  uint `json:"chat_id"`
}
