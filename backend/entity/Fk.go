package entity

import (
	"gorm.io/gorm"
)

// - คำนำหน้าชื่อ
type Prefix struct {
	gorm.Model
	Name  string  `jason:"name"`
	User  []User  `gorm:"foreignKey:PrefixID"`
	Admin []Admin `gorm:"foreignKey:PrefixID"`
}

// - เพศ
type Gender struct {
	gorm.Model
	Name  string  `jason:"name"`
	User  []User  `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
}

// - หมู่เลือด
type Blood struct {
	gorm.Model
	Name  string  `jason:"name"`
	User  []User  `gorm:"foreignKey:BloodID"`
	Admin []Admin `gorm:"foreignKey:BloodID"`
}

// - สิทธิ์
type Per struct {
	gorm.Model
	Role  string  `jason:"role"`
	Admin []Admin `gorm:"foreignKey:PerID"`
}
