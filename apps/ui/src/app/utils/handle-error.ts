import {throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export function handleError(error: HttpErrorResponse) {
  if (error.status == 0) {
    console.log(error.error);
    alert(error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );
    alert(`Error ${error.status}. Invalid email or password`)
  }
  return throwError(()=>error);
}
