package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
	"backend/models"
	"backend/utils"
)

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var input LoginInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil || input.Email == "" || input.Password == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Locate user file by email
	path := fmt.Sprintf("./data/users/%s.json", input.Email)
	file, err := os.ReadFile(path)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	var user models.User
	err = json.Unmarshal(file, &user)
	if err != nil {
		http.Error(w, "Corrupt user data", http.StatusInternalServerError)
		return
	}

	// Check if user is verified
	if !user.Verified {
		http.Error(w, "Email not verified", http.StatusForbidden)
		return
	}

	// Check password (hash match)
	if !utils.CheckPasswordHash(input.Password, user.PasswordHash) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Create secure token (serial + timestamp + signature)
	token := utils.GenerateToken(user.Email)
	user.LastLogin = time.Now().Unix()

	// Save updated last login in user file
	newData, _ := json.MarshalIndent(user, "", "  ")
	_ = os.WriteFile(path, newData, 0644)

	// Return token as response
	json.NewEncoder(w).Encode(map[string]string{
		"token":  token,
		"email":  user.Email,
		"status": "Login successful",
	})
}

