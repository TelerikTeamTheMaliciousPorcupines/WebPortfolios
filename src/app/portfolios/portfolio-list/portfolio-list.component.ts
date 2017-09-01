import { SortPipe } from './../../shared/pipes/sort.pipe';
import { PortfolioService } from './../../core/providers/portfolio/portfolio.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Portfolio } from '../../models/portfolio-model';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  portfolios: Portfolio[];
  filteredPortfolios: Portfolio[];
  sort = '';
  order = '';

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit() {
        this.portfolioService.collectionChange
        .subscribe(collection => {
        this.portfolios = collection;
        this.searchPortfolio(this.message.nativeElement.value);
      });
  }

  // getPortfolios(): void {
  //   this.portfolioService.getAll()
  //     .then((portfolios) => {
  //       this.portfolios = portfolios;
  //       this.filteredPortfolios = this.portfolios;
  //     });
  // }

  searchPortfolio(query: string) {
    this.filteredPortfolios = [];
    this.filteredPortfolios = this.portfolios.filter((portfolio) => {
      return portfolio.profession.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

}
