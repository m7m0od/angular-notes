import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"",redirectTo:"signin",pathMatch:"full"},
  {path:"signin",component:SignInComponent},
  {path:"signup",component:SignUpComponent},
  {path:"profile",canActivate:[AuthGuard],component:ProfileComponent},
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
