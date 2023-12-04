import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {User} from "../types/user";
import {HttpClient} from "@angular/common/http";
import {handleError} from "../utils/handle-error";
import {JwtToken} from "../types/jwt-token";

@Injectable()
export class AuthService{
  constructor(private httpClient: HttpClient) {}
  login(user: User): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(
      'http://localhost:3000/api/auth/login',
      user
    ).pipe(catchError(handleError));
  }
  getTokenFromLocalStorage():string|null{
    return localStorage.getItem('token');
  }
}
