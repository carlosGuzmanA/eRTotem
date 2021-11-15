import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Login } from './models/logins';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login: Login = {
    username: '',
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
  }
  iniciarSesion() { // metodo para iniciar sesion
    Swal.fire({
      allowOutsideClick: false,
      text: 'Ingresando',
      icon: 'info',
    });
    Swal.showLoading();
    this.authService.iniciarSesion(this.login).subscribe(
      async (resp: any) => {
        if (await resp) {
          Swal.close();
          this.router.navigateByUrl('/list_products');
        }
      },
      (error) => {
        console.log(error);
        if (error) {
          Swal.fire({
            title: 'Error al autenticar',
            text: error.error.message,
            icon: 'error',
          });
        }
      }
    );
  }
}
