import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        console.error(error.stack);
        /// Send to Slack or Log management channel here
      }
      throw new Error('Internal server error');
    }
  }
}
