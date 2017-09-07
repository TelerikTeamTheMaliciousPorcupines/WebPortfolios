import { Portfolio } from './../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {

  routerSubscription: ISubscription;
  portfolio: Portfolio;
  receiverEmail: string;

  constructor(
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.receiverEmail = this.route.snapshot.params['email'];
    this.routerSubscription = this.route.data.subscribe(data => {
      this.portfolio = data.portfolio;
    });
  }


  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}

