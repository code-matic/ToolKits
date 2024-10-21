package app

import (
	"github.com/codeblock-toolkit/backend/internal/services/github"
	"github.com/gin-gonic/gin"
)

func configureRoutes() {
	ghApi := github.NewGH_API()
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "ok"})
	})
	v1 := router.Group("/api/v1")
	{
		gh := v1.Group("github")
		{
			gh.GET("/login", ghApi.GithubLogin)
		}
	}
}
