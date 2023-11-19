package middlewares

import (
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/henlies/project/service"
)

// ตรวจสอบ token
func Authorizes() fiber.Handler {
	return func(c *fiber.Ctx) error {
		clientToken := c.Get("Authorization")
		if clientToken == "" {
			return c.Status(http.StatusForbidden).JSON(fiber.Map{"error": "No Authorization header provided"})
		}

		extractedToken := strings.Split(clientToken, "Bearer ")
		if len(extractedToken) == 2 {
			clientToken = strings.TrimSpace(extractedToken[1])
		} else {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Incorrect Format of Authorization Token"})
		}

		jwtWrapper := service.JwtWrapper{
			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:    "AuthService",
		}

		_, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
		}
		return c.Next()
	}
}
