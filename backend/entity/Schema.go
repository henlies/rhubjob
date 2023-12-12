package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	PrefixID  uint   `json:"Prefix_id"`
	Prefix    Prefix `gorm:"references:id" json:"Prefix"`
	Firstname string `json:"Firstname"`
	Lastname  string `json:"Lastname"`
	Nickname  string `json:"Nickname"`
	GenderID  uint   `json:"Gender_id"`
	Gender    Gender `gorm:"references:id" json:"Gender"`
	Phone     string `json:"Phone"`
	Email     string `json:"Email"`
	BloodID   uint   `json:"Blood_id"`
	Blood     Blood  `gorm:"references:id" json:"Blood"`
	PerID     uint   `json:"Per_id"`
	Per       Per    `gorm:"references:id" json:"Per"`
	Pic       string `json:"Pic"`
	User      string `json:"User"`
	Pass      string `json:"Pass"`
	RoleID    uint   `json:"Role_id"`
	Role      Role   `gorm:"references:id" json:"Role"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Status int `gorm:"Status"`
}

type User struct {
	gorm.Model
	PrefixID    uint          `json:"Prefix_id"`
	Prefix      Prefix        `gorm:"references:id" json:"Prefix"`
	Firstname   string        `json:"Firstname"`
	Lastname    string        `json:"Lastname"`
	Nickname    string        `json:"Nickname"`
	GenderID    uint          `json:"Gender_id"`
	Gender      Gender        `gorm:"references:id" json:"Gender"`
	Phone       string        `json:"Phone"`
	AddressID   uint          `json:"Address_id"`
	Address     Address       `gorm:"references:id" json:"Address"`
	Email       string        `json:"Email"`
	Birth       time.Time     `json:"Birth"`
	BloodID     uint          `json:"Blood_id"`
	Blood       Blood         `gorm:"references:id" json:"Blood"`
	PetID       uint          `json:"Pet_id"`
	Pet         Pet           `gorm:"references:id" json:"Pet"`
	Descript    string        `json:"Descript"`
	Pic         string        `json:"Pic"`
	User        string        `json:"User"`
	Pass        string        `json:"Pass"`
	RoleID      uint          `json:"Role_id"`
	Role        Role          `gorm:"references:id" json:"Role"`
	UserChat    []UserChat    `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID"`
	UserComment []UserComment `gorm:"foreignKey:User1ID" gorm:"foreignKey:User2ID"`
	// - ใช้สเตตัสแทนการลบข้อมูล
	Status int `json:"Status"`
}

type Post struct {
	gorm.Model
	Descript string    `json:"Descript"`
	Lati     float64   `json:"Lati"`
	Long     float64   `json:"Long"`
	Start    time.Time `json:"Start"`
	End      time.Time `json:"End"`
	Price    int       `json:"Price"`
	User1ID  uint      `json:"User1_id"`
	User1    User      `gorm:"references:ID" json:"User1"`
	User2ID  uint      `json:"User2_id"`
	User2    User      `gorm:"references:ID" json:"User2"`
	StatusID uint      `json:"Status_id"`
	Status   Status    `gorm:"references:ID" json:"Status"`
	Payment  []Payment `gorm:"foreignKey:PostID"`
}

type Address struct {
	gorm.Model
	Descript   string   `json:"Descript"`
	ProvinceID uint     `json:"Province_id"`
	Province   Province `gorm:"references:ID" json:"Province"`
	DistrictID uint     `json:"District_id"`
	District   District `gorm:"references:ID" json:"District"`
	User       []User   `gorm:"foreignKey:AddressID"`
}

type Pet struct {
	gorm.Model
	Name     string `json:"Name"`
	TypeID   uint   `json:"Type_id"`
	Type     Type   `gorm:"references:ID" json:"Type"`
	GeneID   uint   `json:"Gene_id"`
	Gene     Gene   `gorm:"references:ID" json:"Gene"`
	Food     string `json:"Food"`
	Habit    string `json:"Habit"`
	Descript string `json:"Descript"`
	Pill     string `json:"Pill"`
	Pic      string `json:"Pic"`
	User     []User `gorm:"foreignKey:PetID"`
}

type Comment struct {
	gorm.Model
	Descript    string        `json:"Descript"`
	Score       int           `json:"Score"`
	UserComment []UserComment `gorm:"foreignKey:CommentID"`
}

type UserComment struct {
	gorm.Model
	User1ID   uint    `json:"User1_id"`
	User1     User    `gorm:"references:ID" json:"User1"`
	User2ID   uint    `json:"User2_id"`
	User2     User    `gorm:"references:ID" json:"User2"`
	CommentID uint    `json:"Comment_id"`
	Comment   Comment `gorm:"references:ID" json:"Comment"`
}

type Chat struct {
	gorm.Model
	Message1 string     `json:"Message1"`
	Message2 string     `json:"Message2"`
	UserChat []UserChat `gorm:"foreignKey:ChatID"`
}

type UserChat struct {
	gorm.Model
	User1ID uint `json:"User1_id"`
	User1   User `gorm:"references:ID" json:"User1"`
	User2ID uint `json:"User2_id"`
	User2   User `gorm:"references:ID" json:"User2"`
	ChatID  uint `json:"Chat_id"`
	Chat    Chat `gorm:"references:ID" json:"Chat"`
}

type Payment struct {
	gorm.Model
	Time     time.Time `json:"Time"`
	Status   int       `json:"Status"`
	MethodID uint      `json:"Method_id"`
	Method   Method    `gorm:"references:ID" json:"Method"`
	PostID   uint      `json:"Post_id"`
	Post     Post      `gorm:"references:ID" json:"Post"`
}

type Prefix struct {
	gorm.Model
	Name  string  `json:"Name"`
	User  []User  `gorm:"foreignKey:PrefixID"`
	Admin []Admin `gorm:"foreignKey:PrefixID"`
}

type Gender struct {
	gorm.Model
	Name  string  `json:"Name"`
	User  []User  `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
}

type Blood struct {
	gorm.Model
	Name  string  `json:"Name"`
	User  []User  `gorm:"foreignKey:BloodID"`
	Admin []Admin `gorm:"foreignKey:BloodID"`
}

type Per struct {
	gorm.Model
	Role  string  `json:"Role"`
	Admin []Admin `gorm:"foreignKey:PerID"`
}

type Gene struct {
	gorm.Model
	Name   string `json:"Name"`
	TypeID uint   `json:"Type_id"`
	Type   Type   `gorm:"references:ID" json:"Type"`
	Pet    []Pet  `gorm:"foreignKey:GeneID"`
}

type Type struct {
	gorm.Model
	Name string `json:"Name"`
	Gene []Gene `gorm:"foreignKey:TypeID"`
	Pet  []Pet  `gorm:"foreignKey:TypeID"`
}

type District struct {
	gorm.Model
	Name       string    `json:"Name"`
	Zipcode    string    `json:"Zipcode"`
	ProvinceID uint      `json:"Province_id"`
	Province   Province  `gorm:"references:ID" json:"Province"`
	Address    []Address `gorm:"foreignKey:DistrictID"`
}

type Province struct {
	gorm.Model
	Name     string     `json:"Name"`
	District []District `gorm:"foreignKey:ProvinceID"`
	Address  []Address  `gorm:"foreignKey:ProvinceID"`
}

type Status struct {
	gorm.Model
	Name string `json:"Name"`
	Post []Post `gorm:"foreignKey:StatusID"`
}

type Role struct {
	gorm.Model
	Name  string  `json:"Name"`
	User  []User  `gorm:"foreignKey:RoleID"`
	Admin []Admin `gorm:"foreignKey:RoleID"`
}

type Method struct {
	gorm.Model
	Name    string    `json:"Name"`
	Number  int       `json:"Number"`
	Payment []Payment `gorm:"foreignKey:MethodID"`
}
