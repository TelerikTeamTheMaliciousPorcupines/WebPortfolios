import { MdButtonModule, MdInputModule, MdIconModule } from '@angular/material';
import { MyPortfolioFormRoutesModule } from './my-portfolio-form-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPortfolioFormComponent } from './my-portfolio-form.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyPortfolioFormRoutesModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
  ],
  declarations: [
    MyPortfolioFormComponent
    ]
})
export class MyPortfolioFormModule { }
