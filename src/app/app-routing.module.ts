import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatchDetailsComponent } from './components/matchDetails/match-details/match-details.component';
import { AuthGuard } from './auth/auth-guard.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "login", component: LoginComponent},
  { path:"signup", component: SignupComponent},
  { path:"match-details", component: MatchDetailsComponent, canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
