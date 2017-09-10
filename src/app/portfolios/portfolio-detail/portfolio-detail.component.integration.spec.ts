import { ActivatedRoute } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { PortfolioDetailComponent } from './portfolio-detail.component';
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

describe('PortfolioDetailsComponent Integration Tests', () => {
    let component: PortfolioDetailComponent;
    let fixture: ComponentFixture<PortfolioDetailComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let mockActivatedRoute;
    let portfolio, observ;

    beforeEach(async(() => {
        portfolio = {
            'portfolio': {
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
            }
        };
        observ = Observable.of(portfolio);
        mockActivatedRoute = {
            'data': (observ),
            'snapshot': {
                'params': {
                    'email': 'testMail'
                }
            }
        };
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
            declarations: [PortfolioDetailComponent],
            providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
            schemas: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PortfolioDetailComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain name ', () => {
        expect(debugEl.query(By.css('.name')).nativeElement.textContent)
            .toBe('Test LastTest');
    });
    it('view details href should contain email ', () => {

        expect(element.querySelector('.contact-user').getAttribute('href'))
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
    it('to contain the right working-exp  ', () => {

        expect(debugEl.query(By.css('.working-exp')).nativeElement.textContent)
            .toContain('0');
    });
    it('to contain the right interests  ', () => {

        expect(debugEl.query(By.css('.tabs.margin-left-5')).nativeElement.textContent)
            .toContain('interest');
    });

    it('to contain no portfolio text when there is no portfolio  ', () => {
        component.portfolio = null;
        fixture.detectChanges();
        expect(debugEl.query(By.css('.no-portfolio-text')).nativeElement.textContent)
            .toContain('This user currently doesn`t have portfolio!');
    });
    it('to contain contact when there is no portfolio  ', () => {
        component.portfolio = null;
        fixture.detectChanges();
        expect(debugEl.query(By.css('.contact-user')).nativeElement.textContent)
            .toContain('testMail');
    });

});


