import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Userlogin } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: Userlogin = new Userlogin();

  isSingupClicked: boolean = false;

  errorMessage: string | undefined;
  constructor(private router: Router, 
              private _authService: AuthService,
              private _toastr: ToastrService) {}

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }
  login() {
    this._authService.Autheticate(this.loginObj).subscribe(
      (data: any) => {
        if (data.statusCode == 0) {
          this.router.navigate(['/match-details']);
          this._toastr.success("You are now successfully logged in.")
        } else {
          this._toastr.success(data.message)
        }
      },
      (error: any) => {
        this._toastr.success(error.message)
      }
    );
  }

  goToSignUp(): void {
    this.isSingupClicked = true;
  }
}
