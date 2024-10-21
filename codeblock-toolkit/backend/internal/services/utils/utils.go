package utils

import "github.com/gin-gonic/gin"

type ResponseType struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func InfoResponse(ctx *gin.Context, message string, data interface{}, statusCode int) {
	ctx.JSON(statusCode, ResponseType{
		Message: message,
		Data:    data,
		Code:    0,
	})
}

func ErrorResponse(ctx *gin.Context, message string, statusCode int) {
	ctx.JSON(statusCode, ResponseType{
		Message: message,
		Data:    nil,
		Code:    1,
	})
}
