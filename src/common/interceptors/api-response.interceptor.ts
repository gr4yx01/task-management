import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import APIResponse from '../types/api-response';

const DEFAULT_PRIVATE_FIELDS = ['hashedPassword'];

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

        const processedData = data_
          ? this.removePrivateField(data_, context)
          : null;

        const success = !(data instanceof Error) && data_ !== null;
        return {
          success,
          data: processedData || undefined,
          message,
        };
      }),
    );
  }

  private removePrivateField(
    data: unknown,
    context: ExecutionContext,
  ): unknown {
    if (data === null || typeof data !== 'object') {
      return data;
    }

    if (data instanceof Date) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.removePrivateField(item, context));
    }

    const result = { ...(data as object) };

    const privateFields = [...DEFAULT_PRIVATE_FIELDS];

    for (const field of privateFields) {
      delete result[field];
    }

    for (const key in result) {
      if (result[key] !== null && typeof result[key] === 'object') {
        result[key] = this.removePrivateField(result[key], context);
      }
    }

    return result;
  }
}
