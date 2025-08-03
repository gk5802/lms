package routes

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func VerifyHandler(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	token := r.URL.Query().Get("token")

	if email == "" || token == "" {
		http.Error(w, "Missing email or token", http.StatusBadRequest)
		return
	}

	path := fmt.Sprintf("./data/users/%s.json", email)
	file, err := os.ReadFile(path)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	var user models.User
	err = json.Unmarshal(file, &user)
	if err != nil {
		http.Error(w, "Invalid user data", http.StatusInternalServerError)
		return
	}

	// Check token match and expiry (optional)
	if user.VerificationCode != token {
		http.Error(w, "Invalid verification token", http.StatusForbidden)
		return
	}

	// Optional: Check token age (15 minutes expiry)
	timestampStr := strings.Split(token, "-")[0]
	tokenTime, err := strconv.ParseInt(timestampStr, 10, 64)
	if err == nil {
		if time.Now().Unix()-tokenTime > 900 {
			http.Error(w, "Token expired", http.StatusGone)
			return
		}
	}

	user.Verified = true

	newData, _ := json.MarshalIndent(user, "", "  ")
	_ = os.WriteFile(path, newData, 0644)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Email verified! You can now log in.",
	})
}

