import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private routerService: RouterService,
  ) {}

  canActivate(): boolean {
    if (this.authService.getAuthenticated()) {
      return true;
    } else {
      this.routerService.navigateToLogin();
      return false;
    }
  }
}
