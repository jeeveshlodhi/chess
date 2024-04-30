package model

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

type User struct {
    ID       int64  `db:"id"`
    Username string `db:"username"`
    Password string `db:"password"`
}

// UserExistsByUsername checks if a user with the given username exists in the database.
func UserExistsByUsername(db *sqlx.DB, username string) (bool, error) {
    var count int
    err := db.Get(&count, "SELECT COUNT(*) FROM users WHERE username = $1", username)
    if err != nil {
		fmt.Println(err)
        return false, err
    }
    return count > 0, nil
}

// CreateUser creates a new user in the database.
func CreateUser(db *sqlx.DB, user *User) error {
    _, err := db.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", user.Username, user.Password)
	fmt.Println(err)
	return err
}
