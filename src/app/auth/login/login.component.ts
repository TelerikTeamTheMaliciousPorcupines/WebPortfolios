import { AppComponent } from './../../app.component';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { CoreModule } from './../../core/core.module';
import { UserLoginDetailsModel } from './../../models/user-login-model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user = new UserLoginDetailsModel('', '');
  // public errorMsg = '';

  private toastr;

  constructor(private authSv: AuthenthicationService, private router: Router, appComp: AppComponent) {
    this.toastr = appComp.toastr;
  }

  login() {
    const component = this;
    this.authSv.login(this.user)
      .then((isOk: boolean) => {
        if (isOk) {
          component.toastr.success('Welcome ' + this.user.email);
          if (this.authSv.redirectUrl) {
            const url = this.authSv.redirectUrl;
            component.authSv.redirectUrl = '';
            component.router.navigateByUrl(url);
          } else {
            component.router.navigate(['./portfolios/all']);
          }
        }
      })
      .catch(function (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          component.toastr.error('Wrong password.');
        } else {
          component.toastr.error(errorMessage);
        }
        return false;
      });
  }

}
