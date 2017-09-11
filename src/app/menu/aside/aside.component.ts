import { ISubscription } from 'rxjs/Subscription';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  public userEmail;
  constructor(private authService: AuthenthicationService) {
  }


  ngOnInit() {
    this.subscription = this.authService.currentUser.subscribe(user => {
      if (!!user) {
        this.userEmail = btoa(user.email);
      } else {
        this.userEmail = 'notRegisterUser';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
