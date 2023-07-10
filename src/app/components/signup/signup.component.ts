import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/signUp.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpObj: User = new User();
  isloginClicked: boolean = false;
  errorMessage: string;

  constructor(private _authService: AuthService, 
              private router: Router,
              private _toastr : ToastrService) {}

  Signup() {
    this._authService.RegisterUser(this.signUpObj).subscribe(
      (data: any) => {
        if (data.statusCode == 0) {
          // this.router.navigate(['/login']);
          this.isloginClicked = true;
          this._toastr.success("You are successfully registered. Please proceed to login.")
        } else {
          this._toastr.error( data.message)
        }
      },
      (error: { message: string }) => {
        this._toastr.error( error.message)
        // this.errorMessage = error.message;
      }
    );
  }
  goTologin(): void {
    this.isloginClicked = true;
  }
}
