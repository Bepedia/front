import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.authService.afAuth.authState.subscribe(userData => {
        if (!userData) {
          this.router.navigate(['login']);
          return resolve(false);
        }
        if (environment.authorizedUsers.indexOf(userData.email) === -1) {
          this.router.navigate(['unauthorized']);
          return resolve(false);
        }
        resolve(true);
      })
    })
  }

}
