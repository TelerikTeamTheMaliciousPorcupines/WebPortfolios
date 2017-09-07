import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Portfolio } from './../../models/portfolio-model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ParamMap, Router } from '@angular/router';
import { PortfolioService } from './../../core/providers/portfolio/portfolio.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class PortfolioDetailsResolver implements Resolve<Portfolio>
{
    constructor(
        private portfolioService: PortfolioService,
        private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Portfolio> {
        const email = route.params['email'];
        return Observable.fromPromise(this.portfolioService.getPortfolio(email))
        .catch((error: any) => {
            console.log(`${error}. Heading back to all portfolios`);
            this.router.navigate(['/portfolios/all']);
            return Observable.of(null);
        });

    }

}
