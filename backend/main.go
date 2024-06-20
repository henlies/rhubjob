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

	// - interface
	app.Get("/allofuser", controller.ListAllofUser)

	app.Get("/allofuserr", controller.ListAllofuser)
	app.Get("/allofdog", controller.ListAllofDog)
	app.Get("/allofcat", controller.ListAllofCat)

	app.Get("/allofprovider", controller.ListAllofprovider)
	app.Get("/allofpostdog", controller.ListAllofPostDog)
	app.Get("/allofpostcat", controller.ListAllofPostCat)
	app.Get("/rate/:id", controller.RateID)
	app.Get("/count/:id", controller.CountID)

	// - foreign
	app.Get("/prefixes", controller.ListPrefixes)
	app.Get("/genders", controller.ListGenders)
	app.Get("/bloods", controller.ListBloods)
	app.Get("/types", controller.ListTypes)
	app.Get("/genes/:tid", controller.ListGenes)
	app.Get("/provinces", controller.ListProvinces)
	app.Get("/districts/:pid", controller.ListDistricts)
	app.Get("/zipcode/:id", controller.GetZipcodeDID)

	// - ป้องกันข้อมูล
	// api := app.Group("")
	// protected := api.Use(middlewares.Authorizes())

	// - Addrss
	app.Get("/address/:id", controller.GetAddressID)
	app.Post("/address", controller.CreateAddress)
	app.Patch("/address", controller.UpdateAddress)

	// - Pet
	app.Get("/pet/:id", controller.GetPetID)
	app.Post("/pet", controller.CreatePet)
	app.Patch("/pet", controller.UpdatePet)

	// - Notify
	app.Get("/notifynow/:id", controller.ShowNotifyCaseByUID)
	app.Get("/notifyhistory/:id", controller.ShowHistoryByID)
	app.Get("/notifyhistorypro/:id", controller.ShowNotifyHistoryByID)
	app.Get("/notifycheckhistorypro/:id", controller.ShowNotifyCheckHistoryByID)
	app.Post("/createnotify", controller.CreateNotify)

	// - User
	app.Get("/usersactive", controller.ListUsersActive)
	app.Get("/usersnonactive", controller.ListUsersNonactive)

	app.Get("/serviceuser/:id", controller.GetServiceUserByUID)
	app.Post("/usersigninuse", controller.CreateUserSigninUse)
	app.Patch("/serviceuserdetail", controller.UpdateDetailServiceUser)
	app.Delete("/serviceuser/:user", controller.DeleteServiceUser)
	app.Delete("/useractive/:user", controller.ActiveServiceUser)

	app.Get("/listserviceprovider", controller.ListServiceProvider)
	app.Get("/serviceprovider/:id", controller.GetServiceProviderByUID)
	app.Post("/usersigninjob", controller.CreateUserSigninJob)
	app.Delete("/serviceprovider/:user", controller.DeleteServiceProvider)
	app.Delete("/userapprove/:id", controller.ApproveUser)
	app.Delete("/provideractive/:user", controller.ActiveServiceProvider)

	// - Admin
	// app.Get("/admins", controller.ListAdmins)
	// app.Get("/admin/:id", controller.GetAdmins)
	// app.Post("/admin", controller.CreateAdmin)
	// app.Patch("/admindetail", controller.UpdateAdmin)
	// app.Patch("/adminpass", controller.UpdatePasswordAdmin)
	// app.Delete("/admin/:id", controller.DeleteAdmin)

	// - Post
	app.Get("/getpostuid/:uid", controller.GetPostbyUid)
	app.Get("/getpost/:id", controller.GetPostbyId)
	app.Get("/getposttrack/:id", controller.GetPostbyPId)
	app.Get("/getpostincase/:uid", controller.GetPostInCaseByuid)

	app.Get("/poststatus1/:id", controller.GetPostShowIDstatus1)
	app.Get("/poststatus2/:id", controller.GetPostShowIDstatus2)
	app.Get("/poststatus3/:id", controller.GetPostShowIDstatus3)
	app.Get("/poststatus4/:id", controller.GetPostShowIDstatus4)

	app.Post("/post", controller.CreatePost)
	app.Patch("/post", controller.UpdatePost)
	app.Delete("/post/:id", controller.DeletePost)
	app.Patch("/canclepost", controller.CanclePost)
	app.Patch("/gotrate", controller.RateAfterJobDone)
	app.Delete("/finishpost/:id", controller.FinishPost)
	app.Delete("/acceptpost/:id", controller.AcceptPost)
	app.Delete("/nonacceptpost/:id", controller.NonAcceptPost)
	app.Delete("/selectpost/:id/:uid", controller.SelectPost)

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
