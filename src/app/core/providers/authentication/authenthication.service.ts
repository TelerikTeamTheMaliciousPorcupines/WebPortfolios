import { Observable } from 'rxjs/Observable';
import { UserLoginDetailsModel } from './../../../models/user-login-model';
import { FirebaseService } from './../firebase/firebase.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthenthicationService {

    public currentUser;
    public redirectUrl: string;

    public currentUserEmail: string;
    constructor(private userService: FirebaseService) {
        this.currentUser = this.userService.user;
        this.userService.user.subscribe(x => {
            if (!!x) {
                this.currentUserEmail = x.email;
            } else {
                this.currentUserEmail = '';
            }
        });
    }
    login(inputUser: UserLoginDetailsModel) {
        return this.userService.login(inputUser.email, inputUser.password, inputUser.shouldRemember);
    }

    logout() {
        return this.userService.logout();
    }

    signIn(inputUser: UserLoginDetailsModel) {
        return this.userService.signIn(inputUser.email, inputUser.password);
    }

}
