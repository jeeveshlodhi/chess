package route

import (
	"net/http"
	"time"

	"github.com/jeeveshlodhi/chess/api/controller"
	"github.com/jmoiron/sqlx"
)

func Setup(timeout time.Duration, db *sqlx.DB) {
	http.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
        controller.SignUpController(w, r, db)
    })
    http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
        controller.LoginController(w, r, db)
    })
}