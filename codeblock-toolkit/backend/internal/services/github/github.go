package github

import (
	"fmt"
	"net/http"

	"github.com/codeblock-toolkit/backend/config"
	"github.com/codeblock-toolkit/backend/logger"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var (
	oauthConf = oauth2.Config{
		ClientID:     config.Env.GH_CLIENT_ID,
		ClientSecret: config.Env.GH_CLIENT_SECRET,
		Endpoint:     github.Endpoint,
		RedirectURL:  config.Env.GH_REDIRECT_URL,
	}
	oauthStateString = "randomStringToPreventCRSF"
	log              = logger.GetLogger()
)

type GH_API struct {
}

func NewGH_API() *GH_API {
	return &GH_API{}
}

func (gh GH_API) GithubLogin(gc *gin.Context) {
	log.Info("GithubLogin")
	// url := oauthConf.AuthCodeURL(oauthStateString, oauth2.AccessTypeOnline)
	// gc.Redirect(http.StatusTemporaryRedirect, url)
	githubAuthURL := "https://github.com/login/oauth/authorize"

	// Redirect user to GitHub for authorization
	redirectURL := fmt.Sprintf("%s?client_id=%s&redirect_uri=%s&scope=%s",
		githubAuthURL,
		config.Env.GH_CLIENT_ID,
		config.Env.GH_REDIRECT_URL,
		"repo") // Requesting access to user's repositories

	gc.Redirect(http.StatusTemporaryRedirect, redirectURL)
}

func (gh GH_API) GithubCallback(gc *gin.Context) {
	log.Info("Call back triggered")
	state := gc.Query("state")
	if state != oauthStateString {
		gc.Redirect(http.StatusTemporaryRedirect, config.Env.GH_REDIRECT_URL)
		return
	}
	code := gc.Query("code")
	token, err := oauthConf.Exchange(gc, code)
	if err != nil {
		log.Error("Error: could not get token:", err)
		gc.Redirect(http.StatusTemporaryRedirect, config.Env.GH_REDIRECT_URL)
		return
	}
	log.Info("token", token.AccessToken)
	gc.SetCookie("github_access_token", token.AccessToken, 3600, "/", "localhost", false, true)
	gc.Redirect(http.StatusTemporaryRedirect, "/repos")

}
