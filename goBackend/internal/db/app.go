package db

import "github.com/jmoiron/sqlx"

type Application struct {
	Env *Env
	SQL *sqlx.DB
}

func App() Application {
	app := &Application{}
	app.Env = NewEnv()

	app.SQL = NewSQLDatabase(app.Env)
	return *app
}
  