package github

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/codeblock-toolkit/backend/config"
	"github.com/codeblock-toolkit/backend/internal/services/utils"
	"github.com/codeblock-toolkit/backend/logger"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var (
	oauthConf        oauth2.Config
	oauthStateString = "randomStringToPreventCRSF1"
	log              = logger.GetLogger()
)

type GH_API struct {
}

func NewGH_API() *GH_API {
	return &GH_API{}
}
func init() {
	oauthConf = oauth2.Config{
		ClientID:     config.Env.GH_CLIENT_ID,
		ClientSecret: config.Env.GH_CLIENT_SECRET,
		Endpoint:     github.Endpoint,
		RedirectURL:  "",
		Scopes:       []string{"user:email", "repo"},
	}
}

func (gh GH_API) GithubLogin(gc *gin.Context) {
	url := oauthConf.AuthCodeURL(oauthStateString, oauth2.AccessTypeOnline)
	gc.Redirect(http.StatusTemporaryRedirect, url)
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
	gc.Redirect(http.StatusTemporaryRedirect, "/api/v1/github/repos")

}

func (gh GH_API) FetchRepos(gc *gin.Context) {
	token, err := gc.Request.Cookie("github_access_token")
	if err != nil {
		log.Error("Error: could not get token:", err)
		// gc.Redirect(http.StatusTemporaryRedirect, config.Env.GH_REDIRECT_URL)
		utils.ErrorResponse(gc, "Error: could not get token:"+err.Error(), http.StatusBadRequest)
	}
	log.Info("token", token.Value)
	client := oauthConf.Client(gc, &oauth2.Token{AccessToken: token.Value})
	resp, err := client.Get("https://api.github.com/user/repos?per_page=100")
	if err != nil {
		log.Error("Error: could not get repos:", err)
		utils.ErrorResponse(gc, "Error: could not get repos:"+err.Error(), http.StatusBadRequest)
		return
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		utils.ErrorResponse(gc, "Error: could not read response body:"+err.Error(), http.StatusBadRequest)
		return
	}
	var repos []map[string]interface{}
	if err := json.Unmarshal(body, &repos); err != nil {
		utils.ErrorResponse(gc, "Error: could not parse response body:"+err.Error(), http.StatusBadRequest)
		return
	}
	log.Info("repos length", len(repos))
	// log.Info("repos", repos)
	html := `<h1>Select a repo to push a file to</h1><form action='/push' method='POST'><select name='repo'>`
	for _, repo := range repos {
		html += fmt.Sprintf("<option value='%s'>%s</option>", repo["full_name"], repo["full_name"])
	}
	html += `</select><br><input type='submit' value='Push a file'></form>`
	gc.Data(http.StatusOK, "text/html", []byte(html))
}
