package db

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func NewSQLDatabase(env *Env) *sqlx.DB {
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()

	dbName := env.DBName
	dbHost := env.DBHost
	dbUser := env.DBUser
	dbPass := env.DBPass

	fmt.Printf("user=%s dbname=%s sslmode=disable password=%s host=%s \n", dbUser, dbName, dbPass, dbHost)

	connectionString := fmt.Sprintf("user=%s dbname=%s sslmode=disable password=%s host=%s", dbUser, dbName, dbPass, dbHost)
	db, err := sqlx.Connect("postgres", connectionString)
	if err != nil {
		log.Fatalln(err)
	}
	// defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	} else {
		log.Println("Successfully Connected")
	}
	return db
}