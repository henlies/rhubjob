package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"

	"gorm.io/gorm"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func SetupIntoDatabase(db *gorm.DB) {
	// - แยกบทบาท
	db.Model(&Role{}).Create(&Role{
		Name: "ผู้ดูแลระบบ",
	})
	db.Model(&Role{}).Create(&Role{
		Name: "ผู้ใช้งานระบบ",
	})
	// - คำนำหน้า
	db.Model(&Prefix{}).Create(&Prefix{
		Name: "นาย",
	})
	db.Model(&Prefix{}).Create(&Prefix{
		Name: "นาง",
	})
	db.Model(&Prefix{}).Create(&Prefix{
		Name: "นางสาว",
	})
	// - เพศ
	db.Model(&Gender{}).Create(&Gender{
		Name: "เพศชาย",
	})
	db.Model(&Gender{}).Create(&Gender{
		Name: "เพศหญิง",
	})
	db.Model(&Gender{}).Create(&Gender{
		Name: "เพศทางเลือก",
	})
	// - หมู่เลือด
	db.Model(&Blood{}).Create(&Blood{
		Name: "AB",
	})
	db.Model(&Blood{}).Create(&Blood{
		Name: "A",
	})
	db.Model(&Blood{}).Create(&Blood{
		Name: "B",
	})
	db.Model(&Blood{}).Create(&Blood{
		Name: "O",
	})
	db.Model(&Blood{}).Create(&Blood{
		Name: "Rh+",
	})
	db.Model(&Blood{}).Create(&Blood{
		Name: "Rh-",
	})
	// - สิทธ์
	db.Model(&Per{}).Create(&Per{
		Role: "ดูแลระบบ",
	})
	db.Model(&Per{}).Create(&Per{
		Role: "คัดกรองข้อความ",
	})
	db.Model(&Per{}).Create(&Per{
		Role: "จัดการข้อมูลผู้ใช้ระบบ",
	})
	// ===== Assign ข้อมูล =====
	birth := time.Date(2001, 10, 13, 0, 0, 0, 0, time.Local)
	var role Role
	var prefix Prefix
	var gender Gender
	var blood Blood
	var per Per
	db.Raw(`SELECT * FROM roles WHERE name = "ผู้ใช้งานระบบ"`).Scan(&role)
	db.Raw(`SELECT * FROM prefixes WHERE name = "นาย"`).Scan(&prefix)
	db.Raw(`SELECT * FROM genders WHERE name = "เพศชาย"`).Scan(&gender)
	db.Raw(`SELECT * FROM bloods WHERE name = "AB"`).Scan(&blood)
	db.Raw(`SELECT * FROM pers WHERE role = "ดูแลระบบ"`).Scan(&per)
	// ===== ทดสอบข้อมูล =====
	signin := Signin{
		User: "henlies",
		Pass: SetupPasswordHash("12345"),
		Role: role,
	}
	db.Model(&Signin{}).Create(&signin)
	user := User{
		Prefix:    prefix,
		Firstname: "ภัทรพล",
		Lastname:  "การวิชา",
		Nickname:  "เติ้ล",
		Gender:    gender,
		Phone:     "0933486360",
		Email:     "tle.pattharapon@gmail.com",
		Birth:     birth,
		Age:       22,
		Blood:     blood,
		Descript:  "ไม่ว่าง",
		User:      "henlies",
		Pass:      SetupPasswordHash("12345"),
		Pic:       "a",
		Signin:    signin,
	}
	db.Model(&User{}).Create(&user)
	admin := Admin{
		Prefix:    prefix,
		Firstname: "ภัทรพล",
		Lastname:  "การวิชา",
		Nickname:  "เติ้ล",
		Gender:    gender,
		Phone:     "0933486360",
		Email:     "tle.pattharapon@gmail.com",
		Age:       22,
		Blood:     blood,
		User:      "henlies",
		Pass:      SetupPasswordHash("12345"),
		Per:       per,
		Pic:       "a",
		// Signin:    signin,
	}
	db.Model(&Admin{}).Create(&admin)
}
