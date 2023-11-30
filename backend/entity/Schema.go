package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	PrefixID  uint   `json:"prefix_id"`
	Prefix    Prefix `gorm:"references:id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	GenderID  uint   `json:"gender_id"`
	Gender    Gender `gorm:"references:id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	BloodID   uint   `json:"blood_id"`
	Blood     Blood  `gorm:"references:id"`
	PerID     uint   `json:"per_id"`
	Per       Per    `gorm:"references:id"`
	Pic       string `json:"pic"`
	User      string `json:"user"`
	Pass      string `json:"pass"`
	RoleID    uint   `json:"role_id"`
	Role      Role   `gorm:"references:id"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusa int `gorm:"statusa"`
}

type User struct {
	gorm.Model
	PrefixID    uint          `json:"prefix_id"`
	Prefix      Prefix        `gorm:"references:id"`
	Firstname   string        `json:"firstname"`
	Lastname    string        `json:"lastname"`
	Nickname    string        `json:"nickname"`
	GenderID    uint          `json:"gender_id"`
	Gender      Gender        `gorm:"references:id"`
	Phone       string        `json:"phone"`
	AddressID   uint          `json:"address_id"`
	Address     Address       `gorm:"references:id"`
	Email       string        `json:"email"`
	Birth       time.Time     `json:"birth"`
	BloodID     uint          `json:"blood_id"`
	Blood       Blood         `gorm:"references:id"`
	PetID       uint          `json:"pet_id"`
	Pet         Pet           `gorm:"references:id"`
	Descript    string        `json:"descript"`
	Pic         string        `json:"pic"`
	User        string        `json:"user"`
	Pass        string        `json:"pass"`
	RoleID      uint          `json:"role_id"`
	Role        Role          `gorm:"references:id"`
	UserChat    []UserChat    `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID"`
	UserComment []UserComment `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID"`
	UserPost    []UserPost    `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Statusu int `json:"statusu"`
}

type Post struct {
	gorm.Model
	Descript  string    `json:"descript"`
	Lati      float64   `json:"lati"`
	Long      float64   `json:"long"`
	Start     time.Time `json:"start"`
	End       time.Time `json:"end"`
	Price     int       `json:"price"`
	StatusID  uint      `json:"status_id"`
	Status    Status    `gorm:"references:ID"`
	PaymentID uint      `json:"payment_id"`
	Payment   Payment   `gorm:"references:ID"`
	User1ID   uint      `json:"user1_id"`
	User1     User      `gorm:"references:ID"`
	User2ID   uint      `json:"user2_id"`
	User2     User      `gorm:"references:ID"`
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

type Address struct {
	gorm.Model
	ProvinceID uint   `json:"province_id"`
	DistrictID uint   `json:"district_id"`
	Descript   string `json:"descript"`
	User       []User `gorm:"foreignKey:AddressID"`
}

type Pet struct {
	gorm.Model
	Name     string `json:"name"`
	TypeID   uint   `json:"type_id"`
	Type     Type   `gorm:"references:ID"`
	GeneID   uint   `json:"gene_id"`
	Gene     Gene   `gorm:"references:ID"`
	Food     string `json:"food"`
	Habit    string `json:"habit"`
	Descript string `json:"descript"`
	Pill     string `json:"pill"`
	Pic      string `json:"pic"`
	User     []User `gorm:"foreignKey:PetID"`
}

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

type Payment struct {
	gorm.Model
	MethodID uint   `json:"method_id"`
	Post     []Post `gorm:"foreignKey:PaymentID"`
}

type Prefix struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:PrefixID"`
	Admin []Admin `gorm:"foreignKey:PrefixID"`
}

type Gender struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
}

type Blood struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:BloodID"`
	Admin []Admin `gorm:"foreignKey:BloodID"`
}

type Per struct {
	gorm.Model
	Role  string  `json:"role"`
	Admin []Admin `gorm:"foreignKey:PerID"`
}

type Gene struct {
	gorm.Model
	Name   string `json:"name"`
	TypeID uint   `json:"type_id"`
	Type   Type   `gorm:"references:ID"`
	Pet    []Pet  `gorm:"foreignKey:GeneID"`
}

type Type struct {
	gorm.Model
	Name string `json:"name"`
	Gene []Gene `gorm:"foreignKey:TypeID"`
	Pet  []Pet  `gorm:"foreignKey:TypeID"`
}

type District struct {
	gorm.Model
	Name       string    `json:"name"`
	Zipcode    string    `json:"zipcode"`
	ProvinceID uint      `json:"province_id"`
	Province   Province  `gorm:"references:ID"`
	Address    []Address `gorm:"foreignKey:DistrictID"`
}

type Province struct {
	gorm.Model
	Name     string     `json:"name"`
	District []District `gorm:"foreignKey:ProvinceID"`
	Address  []Address  `gorm:"foreignKey:ProvinceID"`
}

type Status struct {
	gorm.Model
	Name string `json:"name"`
	Post []Post `gorm:"foreignKey:StatusID"`
}

type Role struct {
	gorm.Model
	Name  string  `json:"name"`
	User  []User  `gorm:"foreignKey:RoleID"`
	Admin []Admin `gorm:"foreignKey:RoleID"`
}

type Method struct {
	gorm.Model
	Name    string    `json:"name"`
	Number  int       `json:"number"`
	Payment []Payment `gorm:"foreignKey:MethodID"`
}
