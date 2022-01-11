import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneValidator } from '../validate-phone-number.directive';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  maxSymbols = 300;
  currentSymbols = 300;
  isEdit = false;
  userId = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, phoneValidator]),
      placeOfWorkStudy: new FormControl('', Validators.required),
      TShirt: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      skills: new FormArray([
        new FormGroup({
          skillName: new FormControl('', Validators.required),
          skillLevel: new FormControl('', Validators.required)
        }),]),
    });

    this.route.data.subscribe(data => {
      const user = <User | null>data.user;
      if (user) {
        this.isEdit = true;
        this.userId = user.id;
        this.setFormValue({
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          phoneNumber: user.phoneNumber,
          placeOfWorkStudy: user.placeOfWorkStudy,
          TShirt: user.TShirt,
          size: user.size,
          description: user.description,
          skills: user.skills,
        });
      } else {
        this.isEdit = false;
        this.setFormValue({
          name: '',
          surname: '',
          patronymic: '',
          phoneNumber: '',
          placeOfWorkStudy: ' ',
          TShirt: '',
          size: '',
          description: '',
          skills: [{skillName: '', skillLevel: ''}],
        });
      }
    });
  }

  setFormValue(value: { [key: string]: any }) {
    setTimeout(() => {
      this.userForm.setValue(value);
    });
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.userForm.get(fieldName);
    return field && field.touched && field.errors?.[errorType];
  }

  getCurrentSymbolsCount() {
    const description = this.userForm.get('description');
    if (description?.value.length <= 300) {
      this.currentSymbols = this.maxSymbols - description?.value.length;
    } else if (description?.value.length > 300) {
      this.currentSymbols = 0;
    }
  }

  addSkill() {
    const skills = <FormArray>this.userForm.get('skills');
    const skillGroup = new FormGroup({
      skillName: new FormControl('', Validators.required),
      skillLevel: new FormControl('', Validators.required),
    });
    skills.push(skillGroup);
  }

  onSubmit() {
    const user = new User(
      this.userId,
      this.userForm.controls.name.value,
      this.userForm.controls.surname.value,
      this.userForm.controls.patronymic.value,
      this.userForm.controls.phoneNumber.value,
      this.userForm.controls.placeOfWorkStudy.value,
      this.userForm.controls.TShirt.value,
      this.userForm.controls.size.value,
      this.userForm.controls.description.value,
      this.userForm.controls.skills.value
    );
    if (this.isEdit) {
      this.usersService.editUser(user).pipe(
        tap(result => {
          this.usersService.fetchUsersData();
          void this.router.navigate(['/']);
        })).subscribe();
    } else {
      this.usersService.addUser(user).pipe(tap(result => {
        void this.router.navigate(['registered']);
      })).subscribe(() => {
        this.usersService.fetchUsersData();
      });
    }
  }

  getSkillsControls() {
    const skills = <FormArray>this.userForm.get('skills');
    return skills.controls;
  }
}

