/* tslint:disable:no-unused-variable */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {
    MdButtonModule, MdCheckboxModule, MdInputModule, MdListModule,
    MdSelectModule, MdGridListModule, MdIconModule, MdTabsModule, MdRadioModule
} from '@angular/material';
import { SharedModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PortfolioService } from './../../core/providers/portfolio/portfolio.service';
import { PortfolioListComponent } from './portfolio-list.component';

describe('PortfolioListComponent Integration Tests', () => {
    let component: PortfolioListComponent;
    let fixture: ComponentFixture<PortfolioListComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let mockPortfolioService;
    let collection, portfolio, observ, portfolio2;

    beforeEach(async(() => {
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
        mockPortfolioService = { 'collectionChange': (observ) };
        TestBed.configureTestingModule({
            imports: [SharedModule,
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
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [PortfolioListComponent],
            providers: [{ provide: PortfolioService, useValue: mockPortfolioService }],
            schemas: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PortfolioListComponent);
        component = fixture.componentInstance;
        component.message = { 'nativeElement': { 'value': '' } };
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain name ', () => {
        expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
            .toBe('Test LastTest');
    });
    it('view details href should contain email ', () => {

        expect(element.querySelector('.view-details').getAttribute('href'))
            .toContain('TestMail');
    });
    it('to contain the right age ', () => {

        expect(debugEl.query(By.css('.age')).nativeElement.textContent)
            .toContain('10');
    });
    it('to contain the right proffesion  ', () => {

        expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
            .toContain('testProfesion');
    });
    describe(' Filtering ', () => {

        beforeEach(() => {
            portfolio2 = {
                email: 'TestMail2',
                imgUrl: 'TestUrl2',
                firstName: 'Test2',
                lastName: 'LastTest2',
                age: 20,
                profession: 'civilEng',
                interests: ['interest2'],
                workingExperience: 2,
                languages: ['German'],
                projects: ['one'],
                hobbies: ['notCoding'],
                additionalInfo: 'differentInfo',
                rating: 1,
                id: '14',
            };
            collection.push(portfolio2);
        });
        it('search by proffesion should return right portfolio  ', () => {
            component.searchPortfolio('civilEng');
            fixture.detectChanges();
            expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
                .toContain('civilEng');
            expect(debugEl.query(By.css('.age')).nativeElement.textContent)
                .toContain('20');
            expect(element.querySelector('.view-details').getAttribute('href'))
                .toContain('TestMail2');
            expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
                .toBe('Test2 LastTest2');
        });

        it('order by age descending should return right portfolio as first  ', () => {
            component.sort = 'age';
            component.order = 'descending';
            component.searchPortfolio('');
            fixture.detectChanges();
            expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
                .toContain('civilEng');
            expect(debugEl.query(By.css('.age')).nativeElement.textContent)
                .toContain('20');
            expect(element.querySelector('.view-details').getAttribute('href'))
                .toContain('TestMail2');
            expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
                .toBe('Test2 LastTest2');
        });
        it('order by age ascending should return right portfolio as first  ', () => {
            component.sort = 'age';
            component.order = 'ascending';
            component.searchPortfolio('');
            fixture.detectChanges();
            expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
                .toContain('testProfesion');
            expect(debugEl.query(By.css('.age')).nativeElement.textContent)
                .toContain('10');
            expect(element.querySelector('.view-details').getAttribute('href'))
                .toContain('TestMail');
            expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
                .toBe('Test LastTest');
        });
        it('order by workExp ascending should return right portfolio as first  ', () => {
            component.sort = 'workingExperience';
            component.order = 'ascending';
            component.searchPortfolio('');
            fixture.detectChanges();
            expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
                .toContain('testProfesion');
            expect(debugEl.query(By.css('.age')).nativeElement.textContent)
                .toContain('10');
            expect(element.querySelector('.view-details').getAttribute('href'))
                .toContain('TestMail');
            expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
                .toBe('Test LastTest');
        });
        it('order by workExp descending should return right portfolio as first  ', () => {
            component.sort = 'workingExperience';
            component.order = 'descending';
            component.searchPortfolio('');
            fixture.detectChanges();
            expect(debugEl.query(By.css('.proffesion')).nativeElement.textContent)
                .toContain('civilEng');
            expect(debugEl.query(By.css('.age')).nativeElement.textContent)
                .toContain('20');
            expect(element.querySelector('.view-details').getAttribute('href'))
                .toContain('TestMail2');
            expect(debugEl.query(By.css('.name strong')).nativeElement.textContent)
                .toBe('Test2 LastTest2');
        });
    });
});


