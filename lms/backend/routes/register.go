package routes

import (
	"backend/db"
	"encoding/json"
	"net/http"
	"time"
	"backend/models"
	"backend/utils"
)

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IP       string `json:"ip"`
	City     string `json:"city"`
	Country  string `json:"country"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil || req.Email == "" || req.Password == "" || req.Name == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if db.EmailExists(req.Email) {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	}

	// Generate token and hash
	token := utils.GenerateVerificationSerial()
	hashed := utils.HashPassword(req.Password)

	user := models.User{
		ID:               token,
		Name:             req.Name,
		Email:            req.Email,
		PasswordHash:     hashed,
		Verified:         false,
		VerificationCode: token,
		CreatedAt:        time.Now().Unix(),
		IP:               req.IP,
		City:             req.City,
		Country:          req.Country,
		LoginCount:       0,
		IsOAuth:          false,
	}

	err = db.SaveUser(user)
	if err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}

	// Call Next.js API to send email
	// We’ll use fetch to: /api/email/verify?email=...&token=...
	go func() {
		http.Get("http://localhost:3000/api/email/verify?email=" + req.Email + "&token=" + token)
	}()

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered. Please verify your email.",
	})
}
