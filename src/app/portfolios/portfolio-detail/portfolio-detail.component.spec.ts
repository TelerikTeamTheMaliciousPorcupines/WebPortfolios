import { PortfolioDetailComponent } from './portfolio-detail.component';
/* tslint:disable:no-unused-variable */
import { Portfolio } from './../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';

describe('PortfolioDetailComponent', () => {
  let component: PortfolioDetailComponent;
  let data: Object;
  let router;
  let observData;

  beforeEach(() => {
    data = {
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
      },
    };
    observData = Observable.of(data);
    router = {
      'snapshot': {
        'params': {
          'email': 'testingEmail'
        }
      },
      'data': (observData)
    };

    component = new PortfolioDetailComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set receiver email right', () => {

    component.ngOnInit();

    expect(component.receiverEmail).toEqual('testingEmail');

  });

  it('ngOnInit should call subscribe once', () => {
    spyOn(observData, 'subscribe');
    component.ngOnInit();
    expect(observData.subscribe).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit should set portfolio to the data portfolio', () => {
    component.ngOnInit();
    expect(component.portfolio).toEqual(data['portfolio']);
  });

  it('ngOnDestroy should call unsubscribe once', () => {
    component.routerSubscription = { 'unsubscribe': () => { }, 'closed': false };
    spyOn(component.routerSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.routerSubscription.unsubscribe).toHaveBeenCalledTimes(1);

  });

});


