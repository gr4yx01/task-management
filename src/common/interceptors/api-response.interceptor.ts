import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import APIResponse from '../types/api-response';

export class APIResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data): APIResponse<any> => {
        const message =
          data && data.message ? data.message : 'Request successful';

        if (data?.message) delete data.message;
        const data_ =
          data instanceof Error ? null : data?.data ? data.data : data;
        const success = !(data instanceof Error) && data_ !== null;
        return {
          success,
          data: data_,
          message,
        };
      }),
    );
  }
}
