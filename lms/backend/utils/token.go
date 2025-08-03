package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

// GenerateToken creates a secure token with serial + time + hash
func GenerateToken(email string) string {
	timestamp := time.Now().Unix()
	raw := fmt.Sprintf("%s:%d", email, timestamp)
	hash := sha256.Sum256([]byte(raw))
	return fmt.Sprintf("%d-%s", timestamp, hex.EncodeToString(hash[:]))
}


// // GenerateToken creates a 32-character random token
// func GenerateToken() string {
// 	bytes := make([]byte, 16)
// 	_, err := rand.Read(bytes)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return hex.EncodeToString(bytes)
// }

// GenerateVerificationSerial combines token + timestamp serial
func GenerateVerificationSerial() string {
	timestamp := time.Now().Unix()
	token := GenerateToken("") // Pass an empty string as argument
	return fmt.Sprintf("%d-%s", timestamp, token)
}
