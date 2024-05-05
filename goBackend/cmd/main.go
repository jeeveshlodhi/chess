package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/jeeveshlodhi/chess/api/route"
	"github.com/jeeveshlodhi/chess/internal/db"
	"github.com/redis/go-redis/v9"
)

type User struct {
	Name  string `db:"username"`
	Email string `db:"email"`
}

func main() {

	ctx := context.Background()
	// Ensure that you have Redis running on your system

	app := db.App()
	env := app.Env

	rdb := redis.NewClient(&redis.Options{
		Addr:     env.RedisAddress,
		Password: env.RedisPassword, // no password set
		DB:       env.RedisDatabase, // use default DB
	})
	defer rdb.Close()

	status, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalln("Redis connection was refused")
	}
	fmt.Println(status)

	db := db.NewSQLDatabase(env)

	timeout := time.Duration(env.ContextTimeout) * time.Second
	route.Setup(timeout, db)

	log.Println("Listing for requests at http://localhost:8000/hello")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
