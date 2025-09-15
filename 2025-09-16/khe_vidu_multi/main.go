package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	resp := Response{Message: "Hello from Go + Docker multi-stage build!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/", helloHandler)
	log.Println("🚀 Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

