import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatchDetailsComponent } from './components/matchDetails/match-details/match-details.component';
import { CreateMatchDetailComponent } from './components/matchDetails/create-match-detail/create-match-detail.component';
import { UpdateMatchDetailComponent } from './components/matchDetails/update-match-detail/update-match-detail.component';
import { CommonModule } from '@angular/common';
import { PaymentDetailComponent } from './components/matchDetails/payment-detail/payment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MatchDetailsComponent,
    CreateMatchDetailComponent,
    UpdateMatchDetailComponent,
    PaymentDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      // closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      preventDuplicates: true,
      countDuplicates: false,
      easeTime: 800,
      positionClass: 'toast-bottom-right'
    }) ,
    AgGridModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
