package config

import (
	"log"
	"reflect"

	"github.com/spf13/viper"
)

type Config struct {
	PORT string `mapstructure:"PORT"`
}

var Env *Config = &Config{}

func LoadConfig() {
	viper.AddConfigPath("./config")
	viper.SetConfigName(".env")
	viper.SetConfigType("env")

	if err := viper.ReadInConfig(); err != nil {
		// env not found; fall back to OS
		log.Printf("Warning: %s", err)
	}
	viper.AutomaticEnv()
	rc := reflect.ValueOf(Env).Elem()
	count := 0
	for i := 0; i < rc.NumField(); i++ {
		envName := reflect.TypeOf(Config{}).Field(i).Name
		value := viper.GetString(envName)
		rc.FieldByName(envName).SetString(value)
		count += len(value)
	}
	if count < 1 {
		log.Fatalln("Error: Missing Env config")
	}
}
