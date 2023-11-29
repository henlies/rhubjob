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
	t1 := Type{Name: "สุนัข"}
	db.Model(&Type{}).Create(&t1)
	// - พันธุ์สัตว์เลี้ยง
	db.Model(&Gene{}).Create(&Gene{Name: "โกลเด้น รีทริฟเวอร์", TypeID: t1.ID})
	// - จังหวัดน่าน
	p1 := Province{Name: "น่าน"}
	db.Model(&Province{}).Create(&p1)
	// - อำเภอน่าน
	db.Model(&District{}).Create(&District{Name: "ท่าวังผา", Zipcode: "55140", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "ทุ่งช้าง", Zipcode: "55130", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "นาน้อย", Zipcode: "55150", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "นาหมื่น", Zipcode: "55180", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "บ่อเกลือ", Zipcode: "55220", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "บ้านหลวง", Zipcode: "55190", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "ปัว", Zipcode: "55120", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "ภูเพียง", Zipcode: "55000", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "สองแคว", Zipcode: "55160", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "สันติสุข", Zipcode: "55210", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "เฉลิมพระเกียรติ", Zipcode: "55130", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "เชียงกลาง", Zipcode: "55160", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "เมืองน่าน", Zipcode: "55000", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "เวียงสา", Zipcode: "55110", ProvinceID: p1.ID})
	db.Model(&District{}).Create(&District{Name: "แม่จริม", Zipcode: "55170", ProvinceID: p1.ID})
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
	db.Raw(`SELECT ID FROM roles WHERE name = "ผู้ใช้งานระบบ"`).Scan(&role)
	db.Raw(`SELECT ID FROM roles WHERE name = "ผู้ดูแลระบบ"`).Scan(&role1)
	db.Raw(`SELECT ID FROM prefixes WHERE name = "นาย"`).Scan(&prefix)
	db.Raw(`SELECT ID FROM genders WHERE name = "เพศชาย"`).Scan(&gender)
	db.Raw(`SELECT ID FROM bloods WHERE name = "AB"`).Scan(&blood)
	db.Raw(`SELECT ID FROM pers WHERE role = "จัดการข้อมูลผู้ใช้ระบบ"`).Scan(&per)
	db.Raw(`SELECT ID FROM genes WHERE name = "โกลเด้น รีทริฟเวอร์"`).Scan(&gene)
	// db.Raw(`SELECT ID FROM statuses WHERE name = "รอเริ่มงาน"`).Scan(&status)
	db.Raw(`SELECT ID FROM districts WHERE name = "ท่าวังผา"`).Scan(&dis)

	// ===== ทดสอบข้อมูลย่อย 1 =====
	pet := Pet{
		Name:     "มอมแมม",
		TypeID:   t1.ID,
		GeneID:   gene.ID,
		Food:     "เพดดรีกรี",
		Habit:    "ขี้เล่น",
		Descript: "ให้อาหารเช้า 08:00 ให้อาหารเย็น 18:00",
		Pill:     "-",
		Pic:      "SOMEPICTURE",
	}
	db.Model(&Pet{}).Create(&pet)
	address := Address{
		ProvinceID: p1.ID,
		DistrictID: dis.ID,
		Descript:   "218 หมู่ 15 บ้านโคกพิทักษ์",
	}
	db.Model(&Address{}).Create(&address)
	// ===== ทดสอบข้อมูล =====
	user := User{
		PrefixID:  prefix.ID,
		Firstname: "ภัทรพล",
		Lastname:  "การวิชา",
		Nickname:  "เติ้ล",
		GenderID:  gender.ID,
		Phone:     "0933486360",
		AddressID: address.ID,
		Email:     "tle.pattharapon@gmail.com",
		Birth:     birth,
		BloodID:   blood.ID,
		PetID:     pet.ID,
		Descript:  "ติดประชุม",
		Pic:       "SOMEPICTURE",
		User:      "henlies",
		Pass:      SetupPasswordHash("12345"),
		Role:      role,
		Statusu:   1,
	}
	db.Model(&User{}).Create(&user)

	admin := Admin{
		PrefixID:  prefix.ID,
		Firstname: "อมร",
		Lastname:  "ณ ขอนแก่น",
		Nickname:  "อมร",
		GenderID:  gender.ID,
		Phone:     "0819650866",
		Email:     "Admin@gmail.com",
		BloodID:   blood.ID,
		PerID:     per.ID,
		Pic:       "SOMEPICTURE",
		User:      "Admin",
		Pass:      SetupPasswordHash("Admin"),
		Role:      role1,
		Statusa:   1,
	}
	db.Model(&Admin{}).Create(&admin)
}
