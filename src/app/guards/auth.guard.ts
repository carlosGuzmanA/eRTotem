import { Injectable, Output, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Output() guardActivate: EventEmitter<boolean> = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.exiteToken()) {
      this.guardActivate.emit(true);
      return true;
    } else {
      this.router.navigateByUrl('/login');
      localStorage.clear();
      this.guardActivate.emit(false);
      return false;
    }
  }
}
