import { async } from '@angular/core/testing';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdSelectModule, MdButtonModule, MdCheckboxModule, MdInputModule,
  MdGridListModule, MdIconModule, MdTabsModule, MdListModule, MdRadioModule
} from '@angular/material';
import { PortfoliosRoutesModule } from './portfolios-routing.module';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    PortfoliosRoutesModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdGridListModule,
    MdIconModule,
    MdTabsModule,
    MdRadioModule,
    FormsModule,
  ],
  declarations: [
    PortfolioListComponent,
    PortfolioDetailComponent,
  ],
  providers: [
  ]
})
export class PortfoliosModule { }
