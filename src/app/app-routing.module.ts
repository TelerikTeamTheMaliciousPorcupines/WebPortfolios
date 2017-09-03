
import { AuthGuard } from './core/providers/guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-fount/page-not-fount.component';
import { ContactComponent } from './menu/contact/contact.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/portfolios/all', pathMatch: 'full' },
  { path: 'portfolios', loadChildren: './portfolios/portfolios.module#PortfoliosModule' },
  { path: 'contact', component: ContactComponent },
  { path: 'my-portfolio-form', loadChildren: './my-portfolio-form/my-portfolio-form.module#MyPortfolioFormModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
