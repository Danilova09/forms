import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserResolverService } from './users/user-item/user-resolver.service';
import { RegisteredComponent } from './app-registered.component';
import { NotFoundComponent } from './app-not-found.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'users/new', component: UserFormComponent},
  {path: 'users/:id/edit', component: UserFormComponent, resolve: {user: UserResolverService}},
  {path: 'registered', component: RegisteredComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
