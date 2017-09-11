import { AuthenthicationService } from './../core/providers/authentication/authenthication.service';
import { Portfolio } from './../models/portfolio-model';
import { PortfolioService } from './../core/providers/portfolio/portfolio.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class MyPortFolioResolver implements Resolve<Portfolio>
{
    constructor(
        private portfolioService: PortfolioService,
        private authService: AuthenthicationService,
        private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Portfolio> {
        const email = atob(route.params['email']);
        console.log(email);
        return Observable.fromPromise(this.portfolioService.getPortfolio(email))
            .catch((error: any) => {
                console.log(`${error}. Heading back to all portfolios`);
                this.router.navigate(['/portfolios/all']);
                return Observable.of(null);
            });
    }
}
