import { AuthenthicationService } from './core/providers/authentication/authenthication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, NavigationStart, NavigationEnd, NavigationError, Router, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  protected loading = true;
  protected showMessages = false;
  private currentUserEmail;
  constructor(private router: Router, private authService: AuthenthicationService) {
  }


  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      if (!!x) {
        this.currentUserEmail = x.email;
      } else {
        this.currentUserEmail = '';
      }
    });
    this.router.events.subscribe(event => {
      this.checkRouterEvent(event);
    });
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  togleMessages() {
    this.showMessages = !this.showMessages;
    if (this.showMessages) {
      console.log(this.currentUserEmail);
      this.router.navigate([{ outlets: { messages: ['messages', this.currentUserEmail] } }]);
    } else {
      this.router.navigate([{ outlets: { messages: null } }]);
    }
  }
}
