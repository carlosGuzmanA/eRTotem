import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login } from '../models/logins';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiEdenRed = environment.apiEdenRed;
  public userToken: string = '';

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  public iniciarSesion(login: Login): Observable<boolean> {
    return this.http
      .get(
        `${this.apiEdenRed}User?userName=${login.username}&password=${login.password}`
      )
      .pipe(
        map((resp: string) => {
          this.guardarTokenAndUsername(resp, login.username);
          return true;
        })
      );
  }

  public guardarTokenAndUsername(idToken: string, username: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', username);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') ?? '';
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  exiteToken(): boolean {
    return this.userToken.length > 2;
  }
}
