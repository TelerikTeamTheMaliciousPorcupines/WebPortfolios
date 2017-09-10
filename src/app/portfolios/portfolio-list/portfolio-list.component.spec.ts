/* tslint:disable:no-unused-variable */
import { Portfolio } from './../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { PortfolioListComponent } from './portfolio-list.component';

describe('PortfolioListComponent', () => {
    let component: PortfolioListComponent;
    let pS;
    let portfolio: Portfolio;
    let collection;
    let observ;

    beforeEach(() => {
        collection = [];
        portfolio = {
            email: 'TestMail',
            imgUrl: 'TestUrl',
            firstName: 'Test',
            lastName: 'LastTest',
            age: 10,
            profession: 'testProfesion',
            interests: ['interest'],
            workingExperience: 0,
            languages: ['English'],
            projects: ['nope'],
            hobbies: ['coding'],
            additionalInfo: 'no info',
            rating: 0,
            id: '12',
        };
        collection.push(portfolio);
        observ = Observable.of(collection);
        pS = { 'collectionChange': (observ) };
        component = new PortfolioListComponent(pS);
        component.message = { 'nativeElement': { 'value': '' } };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should call subscribe once', () => {
        spyOn(observ, 'subscribe');
        component.ngOnInit();
        expect(observ.subscribe).toHaveBeenCalledTimes(1);

    });

    it('ngOnInit should set portfolios', () => {

        component.ngOnInit();
        expect(JSON.stringify(component.portfolios[0])).toEqual(JSON.stringify(portfolio));

    });
    it('ngOnInit should call searchPortfolio exaclty once', () => {

        spyOn(component, 'searchPortfolio');

        component.ngOnInit();
        expect(component.searchPortfolio).toHaveBeenCalledTimes(1);
    });

    it('ngOnDestroy should call unsubscribe once', () => {
        component.subscription = { 'unsubscribe': () => { }, 'closed': false };
        spyOn(component.subscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.subscription.unsubscribe).toHaveBeenCalledTimes(1);

    });

    it('searchPortfolio should return all portfolios if no filter is applied', () => {
        component.portfolios = collection;
        component.searchPortfolio('');
        expect(JSON.stringify(component.filteredPortfolios[0])).toEqual(JSON.stringify(portfolio));
    });

    it('searchPortfolio should return only portfolios that have manager profesion', () => {

        const portfolio2 = {
            email: 'TestMail',
            imgUrl: 'TestUrl',
            firstName: 'Test',
            lastName: 'LastTest',
            age: 10,
            profession: 'manager',
            interests: ['interest'],
            workingExperience: 0,
            languages: ['English'],
            projects: ['nope'],
            hobbies: ['coding'],
            additionalInfo: 'no info',
            rating: 0,
            id: '12',
        };
        collection.push(portfolio2);
        component.portfolios = collection;
        component.searchPortfolio('manager');
        expect(JSON.stringify(component.filteredPortfolios[0])).toEqual(JSON.stringify(portfolio2));
    });
});


