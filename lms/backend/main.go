package main

import (
	"fmt"
	"net/http"
	"backend/routes"
)

func main() {
	http.HandleFunc("/api/register", routes.RegisterHandler)
	http.HandleFunc("/api/verify", routes.VerifyHandler)
	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
