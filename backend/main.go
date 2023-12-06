package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/controller"
	"github.com/henlies/project/entity"
	"github.com/henlies/project/middlewares"
)

func main() {
	entity.SetupDatabase()

	app := fiber.New()
	// - signin
	app.Post("/signin", controller.Signin)
	// - เอาไว้เช็คข้อมูล
	app.Get("/prefixes", controller.ListPrefixes)
	app.Get("/genders", controller.ListGenders)
	app.Get("/bloods", controller.ListBloods)
	app.Get("/pers", controller.ListPers)
	app.Get("/types", controller.ListTypes)
	app.Get("/genes", controller.ListGenes)
	app.Get("/provinces", controller.ListProvinces)
	app.Get("/districts", controller.ListDistricts)
	app.Get("/statuses", controller.ListStatuses)
	app.Get("/roles", controller.ListRoles)
	app.Get("/methods", controller.ListMethods)
	// - ตารางหลายต่อหลาย
	app.Get("/userchats", controller.ListUserChats)
	app.Get("/usercomments", controller.ListUserComments)
	// - ป้องกันข้อมูล
	api := app.Group("")
	protected := api.Use(middlewares.Authorizes())
	// - Comment
	protected.Get("/comments", controller.ListComments)
	// - Chat
	protected.Get("/chats", controller.ListChats)
	// - Payment
	protected.Get("/payments", controller.ListPayments)
	// - Addrss
	protected.Get("/addresses", controller.ListAddresses)
	protected.Get("/address/user/:id", controller.GetAddressUID)
	protected.Post("/address", controller.CreateAddress)
	protected.Patch("/address", controller.UpdateAddress)
	// - Pet
	protected.Get("/pets", controller.ListPets)
	protected.Get("/pet/user/:id", controller.GetPetUID)
	protected.Post("/pet", controller.CreatePet)
	protected.Patch("/pet", controller.UpdatePet)
	// - User
	protected.Get("/users", controller.ListUsers)
	protected.Get("/user/:id", controller.GetUser)
	protected.Post("/user", controller.CreateUser)
	protected.Patch("/userdetail", controller.UpdateUser)
	protected.Patch("/userpass", controller.UpdatePasswordUser)
	protected.Delete("/user/:id", controller.DeleteUser)
	// - Admin
	protected.Get("/admins", controller.ListAdmins)
	protected.Get("/admin/:id", controller.ListAdmins)
	protected.Post("/admin", controller.CreateAdmin)
	protected.Patch("/admindetail", controller.UpdateAdmin)
	protected.Patch("/adminpass", controller.UpdatePasswordAdmin)
	protected.Delete("/admin/:id", controller.DeleteAdmin)
	// - Post
	protected.Get("/posts", controller.ListAddresses)

	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
