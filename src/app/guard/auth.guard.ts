import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private au:AuthService,private route:Router){};
  islogged : Boolean = false;
  //subscription: Subscription = new Subscription;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.au.user.subscribe(user => {
        if(user)
          resolve(true)
        else{
          this.route.navigateByUrl('/login');
          resolve(false)
        }
      })
    })
  }
  
}
