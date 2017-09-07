import { Portfolio } from './../../models/portfolio-model';
/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { PortfolioListComponent } from './portfolio-list.component';

describe('PortfolioListComponent', () => {
    let component: PortfolioListComponent;
    let pS;
    let portfolio: Portfolio;
    let collection;

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
        pS = { 'collectionChange': (Observable.of(collection)) };
        component = new PortfolioListComponent(pS);
        component.message = { 'nativeElement': { 'value': '' } };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should set portfolios', () => {
        component.message = { 'nativeElement': { 'value': '' } };
        component.ngOnInit();
        expect(JSON.stringify(component.portfolios[0])).toEqual(JSON.stringify(portfolio));

    });
    it('should call searchPortfolio exaclty once', () => {

        spyOn(component, 'searchPortfolio');

        component.ngOnInit();
        expect(component.searchPortfolio).toHaveBeenCalledTimes(1);
    });

    it('return all portfolios if no filter is applied', () => {

        component.ngOnInit();
        expect(JSON.stringify(component.filteredPortfolios[0])).toEqual(JSON.stringify(portfolio));
    });

    it('return only portfolios that have manager profesion', () => {

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
        component.message = { 'nativeElement': { 'value': 'manager' } };

        component.ngOnInit();
        expect(JSON.stringify(component.filteredPortfolios[0])).toEqual(JSON.stringify(portfolio2));
    });
});


