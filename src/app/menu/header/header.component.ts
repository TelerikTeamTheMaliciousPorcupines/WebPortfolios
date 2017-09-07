import { AppComponent } from './../../app.component';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toastr;
  isUserLogedIn = false;
  curentUserEmail = '';
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
    this.auth.currentUser.subscribe(x => {
      if (!!x) {
        this.curentUserEmail = x.email;
        this.isUserLogedIn = true;
      } else {
        this.curentUserEmail = '';
        this.isUserLogedIn = false;
      }
    });
  }
}
