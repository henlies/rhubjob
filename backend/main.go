package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/controller"
	"github.com/henlies/project/entity"
)

func main() {
	entity.SetupDatabase()

	app := fiber.New()

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

	// - User
	app.Get("/users", controller.ListUsers)
	app.Get("/user/:id", controller.GetUser)
	app.Post("/user", controller.CreateUser)
	app.Patch("/userdetail", controller.UpdateUser)
	app.Patch("/userpass", controller.UpdatePassword)
	app.Delete("/user/:id", controller.DeleteUser)
	// - Admin
	app.Get("/admins", controller.ListAdmins)

	// - ป้องกันข้อมูล
	// api := app.Group("")
	// protected := api.Use(middlewares.Authorizes())

	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
