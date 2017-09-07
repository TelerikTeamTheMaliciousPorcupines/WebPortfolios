import { AppComponent } from './../../app.component';
import { CoreModule } from './../../core/core.module';
import { UserLoginDetailsModel } from './../../models/user-login-model';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  private toastr;
  public user = new UserLoginDetailsModel('', '');
  public errorMsg = '';

  constructor(private authSv: AuthenthicationService, private router: Router, appComp: AppComponent) {
    this.toastr = appComp.toastr;
  }

  signIn() {
    const component = this;
    this.authSv.signIn(this.user)
      .then((isOk: boolean) => {
        if (isOk) {
          component.toastr.success('You have succesfully registered');
          component.router.navigate(['./auth/login']);
        }
      })
      .catch(function (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          component.toastr.error('The password is too weak.');
        } else {
          component.toastr.error(errorMessage);
        }
        return false;
      });
  }
}
