package constants

const (
	DevEnvironment  = "development"
	ProdEnvironment = "production"
)

var AllowedEnvironments = map[string]bool{
	DevEnvironment:  true,
	ProdEnvironment: true,
}
