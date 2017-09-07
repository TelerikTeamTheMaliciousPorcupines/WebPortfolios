import { Portfolio } from './../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.css']
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {

  private routerSubscription: ISubscription;
  portfolio: Portfolio;

  receiverEmail: string;



  constructor(
    private route: ActivatedRoute,
    private location: Location) {
  }
  ngOnInit(): void {
    this.receiverEmail = this.route.snapshot.params['email'];
    this.routerSubscription = this.route.data.subscribe(data => {
      this.portfolio = data['portfolio'];
    });
  }


  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}

