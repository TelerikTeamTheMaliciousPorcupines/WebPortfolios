import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenthicationService } from './core/providers/authentication/authenthication.service';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import {
  Event, NavigationStart, NavigationEnd, NavigationError, Router,
  NavigationCancel, RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private static abv = 0;
  public loading = true;
  private showMessages = false;
  private currentUserEmail;
  constructor(private router: Router, private authService: AuthenthicationService, public toastr: ToastsManager,
    private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    AppComponent.abv = AppComponent.abv + 1;
    console.log(AppComponent.abv);
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
    if (!!this.currentUserEmail) {
      this.showMessages = !this.showMessages;
      if (this.showMessages) {
        this.router.navigate([{ outlets: { messages: ['messages', 'myMessages'] } }]);
      } else {
        this.router.navigate([{ outlets: { messages: null } }]);
      }
    }
  }
}
