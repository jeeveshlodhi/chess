package controller

import (
	"encoding/json"
	"net/http"

	"github.com/jeeveshlodhi/chess/internal/model"
	"github.com/jeeveshlodhi/chess/internal/utils"
	"github.com/jmoiron/sqlx"
)

type SignUpRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func SignUpController(w http.ResponseWriter, r *http.Request, db *sqlx.DB) {
	var signUpRequest SignUpRequest

	err := json.NewDecoder(r.Body).Decode(&signUpRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if signUpRequest.Username == "" || signUpRequest.Password == "" {
		http.Error(w, "Username and Password required", http.StatusBadRequest)
		return
	}

	userExists, err := model.UserExistsByUsername(db, signUpRequest.Username)
	if err != nil {
		http.Error(w, "Error checking username availability", http.StatusBadRequest)
		return
	}

	if userExists {
		http.Error(w, "Username is already taken", http.StatusConflict)
		return
	}

	hashedPassword, err := utils.HashPassword(signUpRequest.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusBadRequest)
		return
	}

	newUser := model.User{
		Username: signUpRequest.Username,
		Password: hashedPassword,
	}
	err = model.CreateUser(db, &newUser)
	if err != nil {
		http.Error(w, "Error creating user", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))

}
