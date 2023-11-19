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

	// - เอาไว้เช็คข้อมูล
	app.Get("/prefixes", controller.ListPrefixes)
	app.Get("/genders", controller.ListGenders)
	app.Get("/bloods", controller.ListBloods)
	app.Get("/pers", controller.ListPers)

	// - ป้องกันข้อมูล
	api := app.Group("")
	protected := api.Use(middlewares.Authorizes())

	// - User
	protected.Get("/users", controller.ListUsers)
	protected.Get("/user/:id", controller.GetUser)
	protected.Post("/user", controller.CreateUser)
	// protected.Patch("/user", controller.UpdateUser)
	protected.Delete("/user/:id", controller.DeleteUser)
	// - Admin
	protected.Get("/admins", controller.ListAdmins)

	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
