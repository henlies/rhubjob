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
	// - ป้องกันข้อมูล
	api := app.Group("")
	protected := api.Use(middlewares.Authorizes())
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
	protected.Patch("/userpass", controller.UpdatePassword)
	protected.Delete("/user/:id", controller.DeleteUser)
	// - Admin
	protected.Get("/admins", controller.ListAdmins)

	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
