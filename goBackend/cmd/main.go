package main

import (
	"log"
	"net/http"
	"time"

	"github.com/jeeveshlodhi/chess/api/route"
	"github.com/jeeveshlodhi/chess/internal/db"
)

type User struct {
	Name  string `db:"username"`
	Email string `db:"email"`
}

func main() {
	// Hello world, the web server

	app := db.App()
	env := app.Env

	db := db.NewSQLDatabase(env)

	timeout := time.Duration(env.ContextTimeout) * time.Second
	route.Setup(timeout, db)

	log.Println("Listing for requests at http://localhost:8000/hello")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
