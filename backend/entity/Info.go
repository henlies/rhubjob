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
	db.Model(&Role{}).Create(&Role{Name: "ผู้ดูแลระบบ"})
	db.Model(&Role{}).Create(&Role{Name: "ผู้ใช้งานระบบ"})
	// - คำนำหน้า
	db.Model(&Prefix{}).Create(&Prefix{Name: "นาย"})
	db.Model(&Prefix{}).Create(&Prefix{Name: "นาง"})
	db.Model(&Prefix{}).Create(&Prefix{Name: "นางสาว"})
	// - เพศ
	db.Model(&Gender{}).Create(&Gender{Name: "เพศชาย"})
	db.Model(&Gender{}).Create(&Gender{Name: "เพศหญิง"})
	db.Model(&Gender{}).Create(&Gender{Name: "เพศทางเลือก"})
	// - หมู่เลือด
	db.Model(&Blood{}).Create(&Blood{Name: "AB"})
	db.Model(&Blood{}).Create(&Blood{Name: "A"})
	db.Model(&Blood{}).Create(&Blood{Name: "B"})
	db.Model(&Blood{}).Create(&Blood{Name: "O"})
	db.Model(&Blood{}).Create(&Blood{Name: "Rh+"})
	db.Model(&Blood{}).Create(&Blood{Name: "Rh-"})
	// - สิทธ์
	db.Model(&Per{}).Create(&Per{Role: "ดูแลระบบ"})
	db.Model(&Per{}).Create(&Per{Role: "คัดกรองข้อความ"})
	db.Model(&Per{}).Create(&Per{Role: "จัดการข้อมูลผู้ใช้ระบบ"})
	// - ชนิดสัตว์เลี้ยง
	t1 := Type{
		Name: "สุนัข",
	}
	db.Model(&Type{}).Create(&t1)
	// - พันธุ์สัตว์เลี้ยง
	db.Model(&Gene{}).Create(&Gene{Name: "โกลเด้น รีทริฟเวอร์", TypeID: 1})
	// - จังหวัดน่าน
	p1 := Province{
		Name: "น่าน",
	}
	db.Model(&Province{}).Create(&p1)
	// - อำเภอน่าน
	db.Model(&District{}).Create(&District{Name: "ท่าวังผา", Zipcode: "55140", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "ทุ่งช้าง", Zipcode: "55130", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "นาน้อย", Zipcode: "55150", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "นาหมื่น", Zipcode: "55180", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "บ่อเกลือ", Zipcode: "55220", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "บ้านหลวง", Zipcode: "55190", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "ปัว", Zipcode: "55120", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "ภูเพียง", Zipcode: "55000", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "สองแคว", Zipcode: "55160", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "สันติสุข", Zipcode: "55210", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "เฉลิมพระเกียรติ", Zipcode: "55130", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "เชียงกลาง", Zipcode: "55160", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "เมืองน่าน", Zipcode: "55000", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "เวียงสา", Zipcode: "55110", ProvinceID: 1})
	db.Model(&District{}).Create(&District{Name: "แม่จริม", Zipcode: "55170", ProvinceID: 1})
	// - สถานะ
	db.Model(&Status{}).Create(&Status{Name: "รอเริ่มงาน"})
	db.Model(&Status{}).Create(&Status{Name: "ดำเนินงาน"})
	db.Model(&Status{}).Create(&Status{Name: "งานสิ้นสุด"})

	// ===== Assign ข้อมูล =====
	birth := time.Date(2001, 10, 13, 0, 0, 0, 0, time.Local)
	var role Role
	var role1 Role
	var prefix Prefix
	var gender Gender
	var blood Blood
	var per Per
	var gene Gene
	// var status Status
	var dis District
	db.Raw(`SELECT * FROM roles WHERE name = "ผู้ใช้งานระบบ"`).Scan(&role)
	db.Raw(`SELECT * FROM roles WHERE name = "ผู้ดูแลระบบ"`).Scan(&role1)
	db.Raw(`SELECT * FROM prefixes WHERE name = "นาย"`).Scan(&prefix)
	db.Raw(`SELECT * FROM genders WHERE name = "เพศชาย"`).Scan(&gender)
	db.Raw(`SELECT * FROM bloods WHERE name = "AB"`).Scan(&blood)
	db.Raw(`SELECT * FROM pers WHERE role = "จัดการข้อมูลผู้ใช้ระบบ"`).Scan(&per)
	db.Raw(`SELECT * FROM genes WHERE name = "โกลเด้น รีทริฟเวอร์"`).Scan(&gene)
	// db.Raw(`SELECT * FROM statuses WHERE name = "รอเริ่มงาน"`).Scan(&status)
	db.Raw(`SELECT * FROM districts WHERE name = "ท่าวังผา"`).Scan(&dis)

	// ===== ทดสอบข้อมูลย่อย 1 =====
	pet := Pet{
		Name:     "มอมแมม",
		Type:     t1,
		Gene:     gene,
		Food:     "เพดดรีกรี",
		Habit:    "ขี้เล่น",
		Descript: "ให้อาหารเช้า 08:00 ให้อาหารเย็น 18:00",
		Pill:     "-",
		Pic:      "SOMEPICTURE",
	}
	db.Model(&Pet{}).Create(&pet)
	address := Address{
		Province: p1,
		District: dis,
		Descript: "218 หมู่ 15 บ้านโคกพิทักษ์",
	}
	db.Model(&Address{}).Create(&address)
	// ===== ทดสอบข้อมูล =====
	signin := Signin{
		User: "henlies",
		Pass: SetupPasswordHash("12345"),
		Role: role,
	}
	db.Model(&Signin{}).Create(&signin)

	signinA := Signin{
		User: "Admin",
		Pass: SetupPasswordHash("Admin"),
		Role: role1,
	}
	db.Model(&Signin{}).Create(&signinA)

	user := User{
		Prefix:    prefix,
		Firstname: "ภัทรพล",
		Lastname:  "การวิชา",
		Nickname:  "เติ้ล",
		Gender:    gender,
		Phone:     "0933486360",
		Address:   address,
		Email:     "tle.pattharapon@gmail.com",
		Birth:     birth,
		Age:       22,
		Blood:     blood,
		Pet:       pet,
		Descript:  "ติดประชุม",
		User:      "henlies",
		Pass:      SetupPasswordHash("12345"),
		Pic:       "SOMEPICTURE",
		Signin:    signin,
		Statusu:   1,
	}
	db.Model(&User{}).Create(&user)

	admin := Admin{
		Prefix:    prefix,
		Firstname: "อมร",
		Lastname:  "ณ ขอนแก่น",
		Nickname:  "อมร",
		Gender:    gender,
		Phone:     "0819650866",
		Email:     "Admin@gmail.com",
		Age:       27,
		Blood:     blood,
		User:      "Admin",
		Pass:      SetupPasswordHash("Admin"),
		Per:       per,
		Pic:       "SOMEPICTURE",
		Signin:    signinA,
		Statusa:   1,
	}
	db.Model(&Admin{}).Create(&admin)
}
