import { MyPortFolioResolver } from './my-portfolio.resolver.service';
import { AuthGuard } from './../core/providers/guards/auth-guard.service';
import { MyPortfolioFormComponent } from './my-portfolio-form.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard } from '../core/providers/guards/can-deactivate-guard.service';


const routes: Routes = [
  {
    path: ':email',
    component: MyPortfolioFormComponent,
    resolve: { myportfolio: MyPortFolioResolver },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MyPortfolioFormRoutesModule { }
