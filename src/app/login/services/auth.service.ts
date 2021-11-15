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
    this.leerToken(); // leer el token del localstorage
  }

  public iniciarSesion(login: Login): Observable<boolean> { // login: Login
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

  public guardarTokenAndUsername(idToken: string, username: string) { //guardar idToken, username en localstorage
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', username);
  }

  leerToken() { // leer el token del localstorage
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') ?? '';
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  exiteToken(): boolean { // verificar si existe el token
    return this.userToken.length > 2;
  }
}
