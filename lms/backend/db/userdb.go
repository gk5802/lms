package db

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"os"
)

const userPath = "./data/users/"

// SaveUser writes a new user file with email as filename
func SaveUser(user models.User) error {
	os.MkdirAll(userPath, os.ModePerm)
	file := fmt.Sprintf("%s%s.json", userPath, user.Email)
	data, err := json.MarshalIndent(user, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(file, data, 0644)
}

// EmailExists checks if user file already exists
func EmailExists(email string) bool {
	file := fmt.Sprintf("%s%s.json", userPath, email)
	_, err := os.Stat(file)
	return err == nil
}
