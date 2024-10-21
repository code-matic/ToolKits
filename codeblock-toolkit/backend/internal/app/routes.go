package app

import "github.com/gin-gonic/gin"

func configureRoutes() {
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "ok"})
	})
}
