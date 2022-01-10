import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneValidator } from '../validate-phone-number.directive';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user.model';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm!: FormGroup;
  maxSymbols = 300;
  currentSymbols = 300;

  constructor(
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        phoneValidator
      ]),
      placeOfWorkStudy: new FormControl('', Validators.required),
      TShirt: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      skills: new FormArray([
        new FormGroup({
          skillName: new FormControl('', Validators.required),
          skillLevel: new FormControl('', Validators.required)
        }),
      ]),
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
    console.log(this.userForm.controls);
  }

  getSkillsControls() {
    const skills = <FormArray>this.userForm.get('skills');
    return skills.controls;
  }

  saveUser() {
    const user = new User(
      'id',
      this.userForm.controls.name.value,
      this.userForm.controls.surname.value,
      this.userForm.controls.patronymic.value,
      this.userForm.controls.phoneNumber.value,
      this.userForm.controls.placeOfWorkStudy.value,
      this.userForm.controls.TShirt.value,
      this.userForm.controls.size.value,
      this.userForm.controls.description.value,
      this.userForm.controls.skills.value,
    );
    this.usersService.addUser(user);
  }
}

