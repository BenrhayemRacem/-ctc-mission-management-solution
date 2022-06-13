import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Catch(TypeORMError, QueryFailedError)
export class UploadExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message: string = (exception as TypeORMError).message;
    const code: number = (exception as any).code;
    const customResponse = {
      status: 500,
      message: 'Something Went Wrong',
      type: 'Internal Server Error',
      errors: [{ code: code, message: message }],

      timestamp: new Date().toISOString(),
    };
    if (request.file) {
      const filename = request.file.filename;
      fs.unlink(
        path.resolve(path.join(__dirname, '..', '..', 'uploads', filename)),
        (err) => {
          if (err) throw new NotFoundException(err.toString());
        },
      );
    }

    response.status(customResponse.status).json(customResponse);
  }
}
