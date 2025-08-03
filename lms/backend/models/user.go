package models

type User struct {
	ID               string `json:"id"` // UUID or timestamp key
	Name             string `json:"name"`
	Email            string `json:"email"`
	PasswordHash     string `json:"password_hash"`
	Verified         bool   `json:"verified"`
	VerificationCode string `json:"verification_code"`
	CreatedAt        int64  `json:"created_at"`
	IP               string `json:"ip"`
	City             string `json:"city"`
	Country          string `json:"country"`
	LoginCount       int    `json:"login_count"`
	IsOAuth          bool   `json:"is_oauth"` // false for custom, true for Google/GitHub
	LastLogin        int64  `json:"last_login"`
}
