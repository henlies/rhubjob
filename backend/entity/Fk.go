package entity

import (
	"gorm.io/gorm"
)

// - คำนำหน้าชื่อ
type Prefix struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:PrefixID"`
	Admin []Admin `gorm:"foreignKey:PrefixID"`
}

// - เพศ
type Gender struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
}

// - หมู่เลือด
type Blood struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:BloodID"`
	Admin []Admin `gorm:"foreignKey:BloodID"`
}

// - สิทธิ์
type Per struct {
	gorm.Model
	Role  string  `json:"role"`
	Admin []Admin `gorm:"foreignKey:PerID"`
}

// - พันธุ์สัตว์เลี้ยง
type Gene struct {
	gorm.Model
	Name   string `json:"name"`
	TypeID uint
	Type   Type  `gorm:"references:id"`
	Pet    []Pet `gorm:"foreignKey:GeneID"`
}

// - ชนิดสัตว์เลี้ยง
type Type struct {
	gorm.Model
	Name string `json:"name"`
	Gene []Gene `gorm:"foreignKey:TypeID"`
	Pet  []Pet  `gorm:"foreignKey:TypeID"`
}

// - อำเภอ
type District struct {
	gorm.Model
	Name       string `json:"name"`
	Zipcode    string `json:"zipcode"`
	ProvinceID uint
	Province   Province  `gorm:"references:id"`
	Address    []Address `gorm:"foreignKey:DistrictID"`
}

// - จังหวัด
type Province struct {
	gorm.Model
	Name     string     `json:"name"`
	District []District `gorm:"foreignKey:ProvinceID"`
	Address  []Address  `gorm:"foreignKey:ProvinceID"`
}

// - สถานะการรับงาน
type Status struct {
	gorm.Model
	Name string `json:"name"`
	Post []Post `gorm:"foreignKey:StatusID"`
}

// - แยก Role
type Role struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:RoleID"`
	Admin []Admin `gorm:"foreignKey:RoleID"`
}
