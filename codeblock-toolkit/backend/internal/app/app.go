package app

import (
	"log"

	"github.com/codeblock-toolkit/backend/config"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func Run() {
	config.LoadConfig()
	router = gin.Default()
	configureRoutes()
	if err := router.Run(":" + config.Env.PORT); err != nil {
		log.Fatal(err)
	}
}
