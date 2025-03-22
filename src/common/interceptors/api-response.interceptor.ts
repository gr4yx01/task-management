import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import APIResponse from '../types/api-response';
import { DeepPartial } from 'typeorm';

export class APIResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const data_ =
          !(data instanceof Error) && data?.data ? data?.data : data;
        const success = !(data instanceof Error) && data !== null;
        const message = data_ && data?.message;

        const body: APIResponse<any> = {
          success,
          message: message,
          data: data_,
        };

        return body;
      }),
    );
  }
}
