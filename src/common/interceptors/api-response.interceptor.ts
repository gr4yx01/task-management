import { NestInterceptor } from "@nestjs/common";

export class APIResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // return 
    }
}