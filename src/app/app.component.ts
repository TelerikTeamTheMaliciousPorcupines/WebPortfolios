import { ISubscription } from 'rxjs/Subscription';
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
  private subscriptions: ISubscription[];
  public loading = true;
  private showMessages = false;
  private currentUserEmail;
  private opacity = 1;
  constructor(private router: Router, private authService: AuthenthicationService, public toastr: ToastsManager,
    private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions = [];
    this.subscriptions.push(
      this.authService.currentUser.subscribe(x => {
        if (!!x) {
          this.currentUserEmail = x.email;
        } else {
          this.currentUserEmail = '';
        }
      }));
    this.subscriptions.push(
      this.router.events.subscribe(event => {
        this.checkRouterEvent(event);
      }));
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
