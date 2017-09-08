import { ISubscription } from 'rxjs/Subscription';
import { SortPipe } from './../../shared/pipes/sort.pipe';
import { PortfolioService } from './../../core/providers/portfolio/portfolio.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Portfolio } from '../../models/portfolio-model';

@Component({
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit, OnDestroy {
  @ViewChild('message') message: ElementRef;
  portfolios: Portfolio[];
  filteredPortfolios: Portfolio[];
  sort = '';
  order = '';
  fontSize: string;

  subscription: ISubscription;

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit() {
    this.subscription = this.portfolioService.collectionChange
      .subscribe(collection => {
        this.portfolios = collection;
        this.searchPortfolio(this.message.nativeElement.value);
      });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchPortfolio(query: string) {
    this.filteredPortfolios = [];
    this.filteredPortfolios = this.portfolios.filter((portfolio) => {
      return portfolio.profession.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

}
