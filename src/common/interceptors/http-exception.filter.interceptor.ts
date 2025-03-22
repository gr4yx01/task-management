import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import APIResponse from '../types/api-response';
import IUser from '../types/user';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const errorMessage =
      exception?.response?.message || 'An unexpected error occurred';

    const body: APIResponse<null> = {
      success: false,
      message: errorMessage,
      data: null,
    };

    response.status(exception.status).json(body);
  }
}

//  {
//   response: {
//     message: [ 'password is not strong enough' ],
//     error: 'Bad Request',
//     statusCode: 400
//   },
//   status: 400,
//   options: {}
// }
