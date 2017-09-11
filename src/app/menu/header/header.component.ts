import { ISubscription } from 'rxjs/Subscription';
import { AppComponent } from './../../app.component';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  toastr;
  isUserLogedIn = false;
  curentUserEmail = '';

  encryptedEmail = '';
  isClassMenuIconXVisible = false;
  isClassMobileMenuContentVisible = false;
  constructor(private auth: AuthenthicationService, private router: Router, private appComp: AppComponent) {
    this.toastr = appComp.toastr;
  }

  SignOut() {
    this.auth.logout().
      then(() => {
        this.toastr.success('Bye ... We already miss You!!!');
        this.router.navigate(['./portfolios/all']);
      });
  }

  ngOnInit() {
    this.subscription = this.auth.currentUser.subscribe(x => {
      if (!!x) {
        this.curentUserEmail = x.email;
        this.encryptedEmail = btoa(x.email);
        this.isUserLogedIn = true;
      } else {
        this.curentUserEmail = '';
        this.encryptedEmail = '';
        this.isUserLogedIn = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
