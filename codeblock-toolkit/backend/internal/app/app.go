package app

import (
	"log"

	"github.com/codeblock-toolkit/backend/config"
	"github.com/codeblock-toolkit/backend/internal/services/utils/constants"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func Run() {
	router = gin.Default()
	if config.Env.ENVIRONMENT == constants.ProdEnvironment {
		// production
		gin.SetMode(gin.ReleaseMode)
	}
	configureRoutes()
	if err := router.Run(":" + config.Env.PORT); err != nil {
		log.Fatal(err)
	}
}
