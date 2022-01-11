import { Component, Input } from '@angular/core';
import { User } from '../../shared/user.model';
import { UsersService } from '../../shared/users.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() user!: User;
  isRemoving = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  remove() {
    this.isRemoving = true;
    this.usersService.removeUser(this.user).pipe(
      tap(() => {
        this.isRemoving = false;
      }, () => {
        this.isRemoving = false;
      })).subscribe(() => {
      this.usersService.fetchUsersData();
    });
  }

  edit() {
    void this.router.navigate([`users/${this.user.id}/edit`]);
  }
}
