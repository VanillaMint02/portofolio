import {Injectable} from "@angular/core";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../types/user";
import {HttpClient} from "@angular/common/http";
import {handleError} from "../utils/handle-error";
import {JwtToken} from "../types/jwt-token";
import {environment} from "../environments/environment.development";
import {apiPaths} from "../utils/api.paths";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  constructor(private httpClient: HttpClient) {
    const token=localStorage.getItem('token');
    this.authenticated = !!token;
  }

  login(user: User): Observable<JwtToken> {
    console.log(`${environment.apiUrl}${apiPaths.API_AUTH_LOGIN}`);
    return this.httpClient.post<JwtToken>(
      `${environment.apiUrl}${apiPaths.API_AUTH_LOGIN}`,
      user
    ).pipe(
      catchError(handleError),
      tap((jwtToken: JwtToken) => {
        this.authenticated = true;
        localStorage.setItem('token',jwtToken.access_token);
        alert('logged in successfully');
      })
    );
  }
  getAuthenticated(){
    return this.authenticated;
  }

}
