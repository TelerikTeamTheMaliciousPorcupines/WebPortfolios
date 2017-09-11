import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public userEmail;
  constructor(private authService: AuthenthicationService) {
  }


  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (!!user) {
                this.userEmail = btoa(user.email);
            } else {
                this.userEmail = 'notRegisterUser';
            }
    });
  }

}
