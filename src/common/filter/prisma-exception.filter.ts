import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Database error';

    // Map Prisma error codes to user-friendly messages
    switch (exception.code) {
      case 'P2000':
        message = 'Value too long for column';
        break;
      case 'P2002':
        message = 'Duplicate value error: unique constraint failed';
        break;
      case 'P2003':
        message = 'Foreign key constraint failed';
        break;
      case 'P2004':
        message = 'Database constraint failed';
        break;
      case 'P2005':
        message = 'Invalid value for column';
        break;
      case 'P2025':
        message = 'Record not found';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      errorCode: exception.code,
    });
  }
}
