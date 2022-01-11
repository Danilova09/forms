import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { User } from '../../shared/user.model';
import { UsersService } from '../../shared/users.service';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {
  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    const userId = <string>route.params['id'];
    return this.usersService.fetchUser(userId).pipe(mergeMap(user => {
      if (user) {
        return of(user);
      }
      void this.router.navigate(['/']);
      return EMPTY;
    }));
  }
}
