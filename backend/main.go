package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/controller"
	"github.com/henlies/project/entity"
)

func main() {
	entity.SetupDatabase()

	app := fiber.New()
	app.Use(CORSMiddleware())

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
	// api := app.Group("")
	// protected := api.Use(middlewares.Authorizes())
	// - Comment
	app.Get("/comments", controller.ListComments)
	// - Chat
	app.Get("/chats", controller.ListChats)
	// - Payment
	app.Get("/payments", controller.ListPayments)
	// - Addrss
	app.Get("/addresses", controller.ListAddresses)
	app.Get("/address/user/:id", controller.GetAddressUID)
	app.Post("/address", controller.CreateAddress)
	app.Patch("/address", controller.UpdateAddress)
	// - Pet
	app.Get("/pets", controller.ListPets)
	app.Get("/pet/user/:id", controller.GetPetUID)
	app.Post("/pet", controller.CreatePet)
	app.Patch("/pet", controller.UpdatePet)
	// - User
	app.Get("/users", controller.ListUsers)
	app.Get("/usersnonactive", controller.ListUsersNonactive)
	app.Get("/usersactive", controller.ListUsersActive)
	app.Get("/user/:id", controller.GetUser)
	app.Post("/user", controller.CreateUser)
	app.Patch("/userdetail", controller.UpdateUser)
	app.Patch("/userpass", controller.UpdatePasswordUser)
	app.Delete("/user/:id", controller.DeleteUser)
	app.Delete("/userapprove/:id", controller.ApproveUser)
	app.Delete("/useractive/:id", controller.ActiveUser)
	// - Test User
	app.Post("/usersigninuse", controller.CreateUserSigninUse)
	app.Post("/usersigninjob", controller.CreateUserSigninJob)
	// - Admin
	app.Get("/admins", controller.ListAdmins)
	app.Get("/admin/:id", controller.GetAdmins)
	app.Post("/admin", controller.CreateAdmin)
	app.Patch("/admindetail", controller.UpdateAdmin)
	app.Patch("/adminpass", controller.UpdatePasswordAdmin)
	app.Delete("/admin/:id", controller.DeleteAdmin)
	// - Post
	app.Get("/poststart", controller.ListPostStart)
	app.Post("/post", controller.CreatePost)

	app.Listen(":8080")

}

func CORSMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.Response().Header.Set("Access-Control-Allow-Origin", "*")
		c.Response().Header.Set("Access-Control-Allow-Credentials", "true")
		c.Response().Header.Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Response().Header.Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(204)
		}

		return c.Next()
	}
}
