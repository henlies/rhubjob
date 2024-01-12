package entity

// ========================================
// ========================================
// ============= ใช้งานข้อมูลเก่า =============
// ========================================
// ========================================

// type User struct {
// 	gorm.Model
// 	PersonalID uint      `json:"PersonalID"`
// 	PrefixID   uint      `json:"PrefixID"`
// 	Prefix     Prefix    `gorm:"references:id" json:"Prefix"`
// 	Firstname  string    `json:"Firstname"`
// 	Lastname   string    `json:"Lastname"`
// 	Nickname   string    `json:"Nickname"`
// 	GenderID   uint      `json:"GenderID"`
// 	Gender     Gender    `gorm:"references:id" json:"Gender"`
// 	Phone      string    `json:"Phone"`
// 	AddressID  uint      `json:"AddressID"`
// 	Address    Address   `gorm:"references:id" json:"Address"`
// 	Email      string    `json:"Email"`
// 	Birth      time.Time `json:"Birth"`
// 	BloodID    uint      `json:"BloodID"`
// 	Blood      Blood     `gorm:"references:id" json:"Blood"`
// 	PetID      uint      `json:"PetID"`
// 	Pet        Pet       `gorm:"references:id" json:"Pet"`
// 	Descript   string    `json:"Descript"`
// 	Pic        string    `json:"Pic"`
// 	User       string    `json:"User"`
// 	Pass       string    `json:"Pass"`
// 	RoleID     uint      `json:"RoleID"`
// 	Role       Role      `gorm:"references:id" json:"Role"`
// 	// - ใช้สเตตัสแทนการลบข้อมูล
// 	Status int `json:"Status"`
// 	Active int `json:"Active"`
// }

// type Post struct {
// 	gorm.Model
// 	Descript string    `json:"Descript"`
// 	Lati     float64   `json:"Lati"`
// 	Long     float64   `json:"Long"`
// 	Start    time.Time `json:"Start"`
// 	End      time.Time `json:"End"`
// 	Price    int       `json:"Price"`
// 	User1ID  uint      `json:"User1ID"`
// 	User1    User      `gorm:"references:ID" json:"User1"`
// 	User2ID  uint      `json:"User2ID"`
// 	User2    User      `gorm:"references:ID" json:"User2"`
// 	StatusID uint      `json:"StatusID"`
// 	Status   Status    `gorm:"references:ID" json:"Status"`
// }

// type Comment struct {
// 	gorm.Model
// 	Descript    string        `json:"Descript"`
// 	Score       int           `json:"Score"`
// 	UserComment []UserComment `gorm:"foreignKey:CommentID"`
// }

// type UserComment struct {
// 	gorm.Model
// 	User1ID   uint    `json:"User1ID"`
// 	User1     User    `gorm:"references:ID" json:"User1"`
// 	User2ID   uint    `json:"User2ID"`
// 	User2     User    `gorm:"references:ID" json:"User2"`
// 	CommentID uint    `json:"CommentID"`
// 	Comment   Comment `gorm:"references:ID" json:"Comment"`
// }

// type Chat struct {
// 	gorm.Model
// 	Message1 string     `json:"Message1"`
// 	Message2 string     `json:"Message2"`
// 	UserChat []UserChat `gorm:"foreignKey:ChatID"`
// }

// type UserChat struct {
// 	gorm.Model
// 	User1ID uint `json:"User1ID"`
// 	User1   User `gorm:"references:ID" json:"User1"`
// 	User2ID uint `json:"User2ID"`
// 	User2   User `gorm:"references:ID" json:"User2"`
// 	ChatID  uint `json:"ChatID"`
// 	Chat    Chat `gorm:"references:ID" json:"Chat"`
// }

// type Payment struct {
// 	gorm.Model
// 	Time     time.Time `json:"Time"`
// 	Status   int       `json:"Status"`
// 	MethodID uint      `json:"MethodID"`
// 	Method   Method    `gorm:"references:ID" json:"Method"`
// 	PostID   uint      `json:"PostID"`
// 	Post     Post      `gorm:"references:ID" json:"Post"`
// }

// type Method struct {
// 	gorm.Model
// 	Name    string    `json:"Name"`
// 	Number  int       `json:"Number"`
// 	Payment []Payment `gorm:"foreignKey:MethodID"`
// }

// ========================================
// ========================================
// ================ ใช้งาน =================
// ========================================
// ========================================

// type Admin struct {
// 	gorm.Model
// 	PersonalID uint   `json:"PersonalID"`
// 	PrefixID   uint   `json:"PrefixID"`
// 	Prefix     Prefix `gorm:"references:id" json:"Prefix"`
// 	Firstname  string `json:"Firstname"`
// 	Lastname   string `json:"Lastname"`
// 	Nickname   string `json:"Nickname"`
// 	GenderID   uint   `json:"GenderID"`
// 	Gender     Gender `gorm:"references:id" json:"Gender"`
// 	Phone      string `json:"Phone"`
// 	Email      string `json:"Email"`
// 	BloodID    uint   `json:"BloodID"`
// 	Blood      Blood  `gorm:"references:id" json:"Blood"`
// 	PerID      uint   `json:"PerID"`
// 	Per        Per    `gorm:"references:id" json:"Per"`
// 	Pic        string `json:"Pic"`
// 	User       string `json:"User"`
// 	Pass       string `json:"Pass"`
// 	RoleID     uint   `json:"RoleID"`
// 	Role       Role   `gorm:"references:id" json:"Role"`
// 	Status     int    `gorm:"Status"`
// 	Active     int    `json:"Active"`
// }

// type Per struct {
// 	gorm.Model
// 	Role  string  `json:"Role"`
// 	Admin []Admin `gorm:"foreignKey:PerID"`
// }

// type Service_User struct {
// 	gorm.Model
// 	PersonalID uint      `json:"PersonalID"`
// 	PrefixID   uint      `json:"PrefixID"`
// 	Prefix     Prefix    `gorm:"references:id" json:"Prefix"`
// 	Firstname  string    `json:"Firstname"`
// 	Lastname   string    `json:"Lastname"`
// 	Nickname   string    `json:"Nickname"`
// 	GenderID   uint      `json:"GenderID"`
// 	Gender     Gender    `gorm:"references:id" json:"Gender"`
// 	Phone      string    `json:"Phone"`
// 	AddressID  uint      `json:"AddressID"`
// 	Address    Address   `gorm:"references:id" json:"Address"`
// 	Email      string    `json:"Email"`
// 	Line       string    `json:"Line"`
// 	Birth      time.Time `json:"Birth"`
// 	BloodID    uint      `json:"BloodID"`
// 	Blood      Blood     `gorm:"references:id" json:"Blood"`
// 	PetID      uint      `json:"PetID"`
// 	Pet        Pet       `gorm:"references:id" json:"Pet"`
// 	Descript   string    `json:"Descript"`
// 	Pic        string    `json:"Pic"`
// 	User       string    `json:"User"`
// 	Pass       string    `json:"Pass"`
// 	RoleID     uint      `json:"RoleID"`
// 	Role       Role      `gorm:"references:id" json:"Role"`
// 	Post       []Post    `gorm:"foreignKey:Service_UserID"`
// 	Status     int       `json:"Status"`
// 	Active     int       `json:"Active"`
// }

// type Service_Provider struct {
// 	gorm.Model
// 	PersonalID uint      `json:"PersonalID"`
// 	PrefixID   uint      `json:"PrefixID"`
// 	Prefix     Prefix    `gorm:"references:id" json:"Prefix"`
// 	Firstname  string    `json:"Firstname"`
// 	Lastname   string    `json:"Lastname"`
// 	Nickname   string    `json:"Nickname"`
// 	GenderID   uint      `json:"GenderID"`
// 	Gender     Gender    `gorm:"references:id" json:"Gender"`
// 	Phone      string    `json:"Phone"`
// 	AddressID  uint      `json:"AddressID"`
// 	Address    Address   `gorm:"references:id" json:"Address"`
// 	Email      string    `json:"Email"`
// 	Line       string    `json:"Line"`
// 	Birth      time.Time `json:"Birth"`
// 	BloodID    uint      `json:"BloodID"`
// 	Blood      Blood     `gorm:"references:id" json:"Blood"`
// 	Pic        string    `json:"Pic"`
// 	User       string    `json:"User"`
// 	Pass       string    `json:"Pass"`
// 	RoleID     uint      `json:"RoleID"`
// 	Role       Role      `gorm:"references:id" json:"Role"`
// 	Post       []Post    `gorm:"foreignKey:Service_ProviderID"`
// 	Status     int       `json:"Status"`
// 	Active     int       `json:"Active"`
// }

// type Prefix struct {
// 	gorm.Model
// 	Name             string             `json:"Name"`
// 	Service_User     []Service_User     `gorm:"foreignKey:PrefixID"`
// 	Service_Provider []Service_Provider `gorm:"foreignKey:PrefixID"`
// 	Admin            []Admin            `gorm:"foreignKey:PrefixID"`
// }

// type Gender struct {
// 	gorm.Model
// 	Name             string             `json:"Name"`
// 	Service_User     []Service_User     `gorm:"foreignKey:GenderID"`
// 	Service_Provider []Service_Provider `gorm:"foreignKey:GenderID"`
// 	Admin            []Admin            `gorm:"foreignKey:GenderID"`
// }

// type Blood struct {
// 	gorm.Model
// 	Name             string             `json:"Name"`
// 	Service_User     []Service_User     `gorm:"foreignKey:BloodID"`
// 	Service_Provider []Service_Provider `gorm:"foreignKey:BloodID"`
// 	Admin            []Admin            `gorm:"foreignKey:BloodID"`
// }

// type Role struct {
// 	gorm.Model
// 	Name             string             `json:"Name"`
// 	Service_User     []Service_User     `gorm:"foreignKey:RoleID"`
// 	Service_Provider []Service_Provider `gorm:"foreignKey:RoleID"`
// 	Admin            []Admin            `gorm:"foreignKey:RoleID"`
// }

// type Pet struct {
// 	gorm.Model
// 	Name         string         `json:"Name"`
// 	TypeID       uint           `json:"TypeID"`
// 	Type         Type           `gorm:"references:ID" json:"Type"`
// 	GeneID       uint           `json:"GeneID"`
// 	Gene         Gene           `gorm:"references:ID" json:"Gene"`
// 	Food         string         `json:"Food"`
// 	Habit        string         `json:"Habit"`
// 	Descript     string         `json:"Descript"`
// 	Pill         string         `json:"Pill"`
// 	Pic          string         `json:"Pic"`
// 	Service_User []Service_User `gorm:"foreignKey:PetID"`
// }

// type Gene struct {
// 	gorm.Model
// 	Name   string `json:"Name"`
// 	TypeID uint   `json:"TypeID"`
// 	Type   Type   `gorm:"references:ID" json:"Type"`
// 	Pet    []Pet  `gorm:"foreignKey:GeneID"`
// }

// type Type struct {
// 	gorm.Model
// 	Name string `json:"Name"`
// 	Gene []Gene `gorm:"foreignKey:TypeID"`
// 	Pet  []Pet  `gorm:"foreignKey:TypeID"`
// }

// type Address struct {
// 	gorm.Model
// 	Descript         string             `json:"Descript"`
// 	ProvinceID       uint               `json:"ProvinceID"`
// 	Province         Province           `gorm:"references:ID" json:"Province"`
// 	DistrictID       uint               `json:"DistrictID"`
// 	District         District           `gorm:"references:ID" json:"District"`
// 	Service_User     []Service_User     `gorm:"foreignKey:AddressID"`
// 	Service_Provider []Service_Provider `gorm:"foreignKey:AddressID"`
// }

// type District struct {
// 	gorm.Model
// 	Name       string    `json:"Name"`
// 	Zipcode    string    `json:"Zipcode"`
// 	ProvinceID uint      `json:"ProvinceID"`
// 	Province   Province  `gorm:"references:ID" json:"Province"`
// 	Address    []Address `gorm:"foreignKey:DistrictID"`
// }

// type Province struct {
// 	gorm.Model
// 	Name     string     `json:"Name"`
// 	District []District `gorm:"foreignKey:ProvinceID"`
// 	Address  []Address  `gorm:"foreignKey:ProvinceID"`
// }

// type Post struct {
// 	gorm.Model
// 	Descript           string           `json:"Descript"`
// 	Start              time.Time        `json:"Start"`
// 	End                time.Time        `json:"End"`
// 	Price              int              `json:"Price"`
// 	Service_UserID     uint             `json:"Service_UserID"`
// 	Service_User       Service_User     `gorm:"references:ID" json:"Service_User"`
// 	Service_ProviderID uint             `json:"Service_ProviderID"`
// 	Service_Provider   Service_Provider `gorm:"references:ID" json:"Service_Provider"`
// 	StatusID           uint             `json:"StatusID"`
// 	Status             Status           `gorm:"references:ID" json:"Status"`
// }

// type Status struct {
// 	gorm.Model
// 	Name string `json:"Name"`
// 	Post []Post `gorm:"foreignKey:StatusID"`
// }
