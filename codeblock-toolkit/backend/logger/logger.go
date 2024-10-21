package logger

import (
	"log"
	"sync"

	"github.com/codeblock-toolkit/backend/config"
	"github.com/codeblock-toolkit/backend/internal/services/utils/constants"
	"go.uber.org/zap"
)

var (
	logger *zap.SugaredLogger
	once   sync.Once
)

func GetLogger() *zap.SugaredLogger {
	once.Do(func() {
		config.LoadConfig()
		lgr := zap.Must(zap.NewDevelopment())
		if !constants.AllowedEnvironments[config.Env.ENVIRONMENT] {
			log.Fatalln("invalid ENVIRONMENT specified. got:'", config.Env.ENVIRONMENT, "' must be one of ", constants.AllowedEnvironments)
		}
		if config.Env.ENVIRONMENT == constants.ProdEnvironment {
			// production
			lgr = zap.Must(zap.NewProduction())
		}
		zap.ReplaceGlobals(lgr)
		defer lgr.Sync()
		logger = lgr.Sugar()

	})
	return logger

}
