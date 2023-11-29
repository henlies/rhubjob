package entity

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Descript  string    `json:"descript"`
	Lati      float64   `json:"lati"`
	Long      float64   `json:"long"`
	Start     time.Time `json:"start"`
	End       time.Time `json:"end"`
	Price     int       `json:"price"`
	StatusID  uint
	Status    Status `gorm:"references:ID"`
	PaymentID uint
	Payment   Payment `gorm:"references:ID"`
	User1ID   uint
	User1     User `gorm:"references:ID"`
	User2ID   uint
	User2     User `gorm:"references:ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusp  int        `gorm:"statusp"`
	UserPost []UserPost `gorm:"foreignKey:PostID"`
}

type UserPost struct {
	gorm.Model
	User1ID uint `json:"user1_id"`
	User2ID uint `json:"user2_id"`
	PostID  uint `json:"post_id"`
}
