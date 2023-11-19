package service

import (
	"errors"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// สร้าง jwt token
type JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

// เอา token ให้ Username
type JwtClaim struct {
	Username string
	jwt.StandardClaims
}

// - สร้าง token เพื่อ jwt
func (j *JwtWrapper) GenerateToken(username string) (signedToken string, err error) {
	claims := &JwtClaim{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(j.ExpirationHours)).Unix(),
			Issuer:    j.Issuer,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err = token.SignedString([]byte(j.SecretKey))
	if err != nil {
		return
	}
	return
}

// เช็ค jwt token
func (j *JwtWrapper) ValidateToken(signedToken string) (claims *JwtClaim, err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(j.SecretKey), nil
		},
	)
	if err != nil {
		return
	}
	claims, ok := token.Claims.(*JwtClaim)
	if !ok {
		err = errors.New("Couldn't parse claims")
		return
	}
	if claims.ExpiresAt < time.Now().Local().Unix() {
		err = errors.New("JWT is expired")
		return
	}
	return
}
