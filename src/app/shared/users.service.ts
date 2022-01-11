import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersData: User[] = [];
  usersChange = new Subject<User[]>();
  usersFetching = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {}

  fetchUsersData() {
    this.usersFetching.next(true);
    this.http.get<{ [id: string]: User }>('https://users-data-bd1c4-default-rtdb.firebaseio.com/users-data.json')
      .pipe(map(result => {
        this.usersFetching.next(false);
        if (!result) {
          return [];
        }
        return Object.keys(result).map(id => {
          const userData = result[id];
          return new User(
            id,
            userData.name,
            userData.surname,
            userData.patronymic,
            userData.phoneNumber,
            userData.placeOfWorkStudy,
            userData.TShirt,
            userData.size,
            userData.description,
            userData.skills,
          );
        });
      })).subscribe((users) => {
      this.usersData = users;
      this.usersChange.next(users);
    }, () => {
      this.usersFetching.next(false);
    });
  }

  fetchUser(userId: string) {
    return this.http.get<User>(`https://users-data-bd1c4-default-rtdb.firebaseio.com/users-data/${userId}.json`)
      .pipe(map(user => {
        if (!user) {
          return null;
        }
        return new User(
          userId, user.name, user.surname, user.patronymic,
          user.phoneNumber, user.placeOfWorkStudy, user.TShirt,
          user.size, user.description, user.skills
        );
      }));
  }

  addUser(user: User) {
    const body = {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      placeOfWorkStudy: user.placeOfWorkStudy,
      TShirt: user.TShirt,
      size: user.size,
      description: user.description,
      skills: user.skills,
    };
    return this.http.post<User>('https://users-data-bd1c4-default-rtdb.firebaseio.com/users-data.json', body);
  }

  editUser(user: User) {
    const body = {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phoneNumber: user.phoneNumber,
      placeOfWorkStudy: user.placeOfWorkStudy,
      TShirt: user.TShirt,
      size: user.size,
      description: user.description,
      skills: user.skills,
    };
    return this.http.put<User>(`https://users-data-bd1c4-default-rtdb.firebaseio.com/users-data/${user.id}.json`, body);
  }

  removeUser(user: User) {
    return this.http.delete(`https://users-data-bd1c4-default-rtdb.firebaseio.com/users-data/${user.id}.json`);
  }
}


