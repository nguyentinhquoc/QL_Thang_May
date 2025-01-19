import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException
} from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'An error occurred'
    let error = 'Error'
    let validationErrors = null
    if (exception instanceof QueryFailedError) {
      // Handle database errors
      if (exception.message.includes('Duplicate entry')) {
        status = HttpStatus.BAD_REQUEST
        message = 'Duplicate entry error'
        error = 'Bad Request'
        validationErrors = exception.message
      }
    } else {
      // Existing error handling
      status = exception.getStatus()
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
    }

    if (validationErrors == null) {
      validationErrors = ['Vui lòng kiểm tra lại dữ liệu','Please check your data']
    }
    if (request.accepts('html')) {
      response.status(status).render('err/' + status.toString(), {
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
