import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error';

      // Loguear el body de la respuesta si existe (útil para 500 del servidor)
      if (error.error) {
        console.error('Error response body:', error.error);
      }

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Intentar extraer un mensaje del body si existe
        const bodyMessage = (error.error && (error.error.message || error.error.Message))
          ? (error.error.message || error.error.Message)
          : null;

        errorMessage = bodyMessage
          ? `Código: ${error.status} - ${bodyMessage}`
          : `Código: ${error.status} - ${error.message}`;
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
