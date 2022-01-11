import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersSubscription!: Subscription;
  fetchingUsers = false;
  fetchingUsersSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.usersChange.subscribe((users: User[]) => {
      this.users = users;
    });
    this.fetchingUsersSubscription = this.usersService.usersFetching.subscribe((fetching: boolean) => {
      this.fetchingUsers = fetching;
    })
    this.usersService.fetchUsersData();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.fetchingUsersSubscription.unsubscribe();
  }
}
