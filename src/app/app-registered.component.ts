import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="alert alert-success">
      You've successfully registered!
    </div>`,
  styles: [`
    .alert {
      display: block;
      width: 800px;
      margin: 70px auto;
    }`]
})

export class RegisteredComponent {}
