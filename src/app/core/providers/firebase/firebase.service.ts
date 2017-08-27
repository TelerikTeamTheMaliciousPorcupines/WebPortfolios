import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

    public user: any;

    constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase) {
        // this.user = this.afAuth.authState.subscribe(x => console.log(x));
        this.user = this.afAuth.authState;
    }

    public subscribeToCollectionChange(collectionName, callbackMethod) {
        this.afDataBase.database.ref(collectionName).on('value', callbackMethod);
    }
    public getCollection(collectionName: string) {
        return this.afDataBase.database.ref(collectionName).once('value')
            .then((x) => {
                return x.exportVal();
            })
            .then((x) => {
                const resultAsArray = [];
                const keys = Object.keys(x);
                for (const key of keys) {
                    resultAsArray.push(x[key]);
                }
                console.log(resultAsArray);
                return resultAsArray;
            });
    }
    public signIn(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch(function (error: any) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }
    public login(email: string, password: string, shouldRemember: boolean) {
        let persistence = firebase.auth.Auth.Persistence.SESSION;
        if (!shouldRemember) {
            persistence = firebase.auth.Auth.Persistence.NONE;
        }
        return this.afAuth.auth.setPersistence(persistence)
            .then(() => {
                return this.afAuth.auth.signInWithEmailAndPassword(email, password);
            })
            .catch(function (error: any) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }
    public logout() {
        return this.afAuth.auth.signOut();
    }
}
