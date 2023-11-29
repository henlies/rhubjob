package entity

import (
	"gorm.io/gorm"
)

// ตาราง Comment
type Comment struct {
	gorm.Model
	Descript    string        `json:"descript"`
	Score       int           `json:"score"`
	UserComment []UserComment `gorm:"foreignKey:CommentID"`
}

type UserComment struct {
	gorm.Model
	User1ID   uint `json:"user1_id"`
	User2ID   uint `json:"user2_id"`
	CommentID uint `json:"comment_id"`
}
