import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException
} from '@nestjs/common'
import { Response } from 'express'
import { ValidationError } from 'class-validator'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest()
    const status = exception.getStatus()
    let message = 'An error occurred'
    let error = 'Error'
    let validationErrors = null
    if (exception instanceof ForbiddenException) {
      message = "You don't have permission to access this resource."
      error = 'Forbidden'
    } else if (exception instanceof NotFoundException) {
      message = 'Resource not found'
      error = 'Not Found'
    } else if (exception instanceof BadRequestException) {
      message = 'Bad request'
      error = 'Bad Request'
      const response = exception.getResponse()
      if (response instanceof Object && 'message' in response) {
        validationErrors = response['message']
      }
    } else if (exception instanceof InternalServerErrorException) {
      message = 'Internal server error'
      error = 'Internal Server Error'
    }
    if (request.accepts('html')) {
      response.status(status).render(status.toString(), {
        message,
        validationErrors
      })
    } else {
      response.status(status).json({
        statusCode: status,
        message,
        error,
        validationErrors
      })
    }
  }
}
