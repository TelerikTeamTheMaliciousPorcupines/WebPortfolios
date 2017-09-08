import { FirebaseService } from './../firebase/firebase.service';
import { AuthenthicationService } from './authenthication.service';
/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';

describe('AuthenthicationService', () => {

    describe('without before', () => {

        it('constructor should call user subscribe once', () => {
            let service: AuthenthicationService;
            let userObs;
            let fireService;
            userObs = Observable.of({ 'email': 'testMail' });
            fireService = {
                'login': () => { },
                'logout': () => { },
                'signIn': () => { },

                'user': userObs
            };
            spyOn(userObs, 'subscribe');
            service = new AuthenthicationService(fireService);
            expect(userObs.subscribe).toHaveBeenCalledTimes(1);
        });
    });

    describe('with before', () => {
        let service: AuthenthicationService;
        let userObs;
        let fireService;
        let user;

        beforeEach(() => {
            user = {
                'email': 'UserMail',
                'password': 'UserPassword',
                'shouldRemember': true
            };
            userObs = Observable.of({ 'email': 'testMail' });
            fireService = {
                'login': () => { },
                'logout': () => { },
                'signIn': () => { },

                'user': userObs
            };
            service = new AuthenthicationService(fireService);
        });

        it('should create instance', () => {
            expect(service).toBeTruthy();
        });

        it('constructor should set current user to the correct user ', () => {
            expect(service.currentUser).toEqual(userObs);
        });

        it('constructor should set currentUserEmail  to the correct user if there is user ', () => {
            expect(service.currentUserEmail).toEqual('testMail');
        });

        it('logout should call service logout once ', () => {
            spyOn(fireService, 'logout');
            service.logout();
            expect(fireService.logout).toHaveBeenCalledTimes(1);
        });

        it('login should call service login once ', () => {
            spyOn(fireService, 'login');
            service.login(user);
            expect(fireService.login).toHaveBeenCalledTimes(1);
        });
        it('login should call service login with right params ', () => {
            spyOn(fireService, 'login');
            service.login(user);
            expect(fireService.login).toHaveBeenCalledWith(user.email, user.password, user.shouldRemember);
        });

         it('signIn should call service signIn once ', () => {
            spyOn(fireService, 'signIn');
            service.signIn(user);
            expect(fireService.signIn).toHaveBeenCalledTimes(1);
        });
        it('signIn should call service signIn with right params ', () => {
            spyOn(fireService, 'signIn');
            service.signIn(user);
            expect(fireService.signIn).toHaveBeenCalledWith(user.email, user.password);
        });

    });

    describe('with before and empty observable', () => {
        let service: AuthenthicationService;
        let userObs;
        let fireService;
        beforeEach(() => {
            userObs = Observable.of(null);
            fireService = {
                'login': () => { },
                'logout': () => { },
                'signIn': () => { },

                'user': userObs
            };
            service = new AuthenthicationService(fireService);
        });

        it('constructor should set currentUserEmail empty string if no user ', () => {
            service = new AuthenthicationService(fireService);
            expect(service.currentUserEmail).toEqual('');
        });
    });

});


