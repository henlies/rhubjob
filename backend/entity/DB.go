package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("urpet.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database.")
	}

	database.AutoMigrate(
		// - ตารางย่อย
		&Prefix{},
		&Gender{},
		&Blood{},
		&Per{},
		&Gene{},
		&Type{},
		&District{},
		&Province{},
		&Status{},
		&Role{},
		&Method{},
		// - ตารางย่อยที่สำคัญ
		&Pet{},
		&Address{},
		&Chat{},
		&Comment{},
		&Payment{},
		// - ตารางหลายต่อหลาย
		&UserChat{},
		&UserComment{},
		&UserPost{},
		// - ตารางหลัก
		&Admin{},
		&User{},
		&Post{},
	)
	db = database

	SetupIntoDatabase(db)
}
