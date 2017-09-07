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
        this.afDataBase.database.ref(collectionName).once('value')
            .then(x => {
                if (x.exists()) {
                    this.afDataBase.database.ref(collectionName).on('value', callbackMethod);
                } else {
                    callbackMethod({
                        exportVal: function () { return {}; },
                    });
                }
            });
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
                    x[key].id = key;
                    resultAsArray.push(x[key]);
                }
                console.log(resultAsArray);
                return resultAsArray;
            });
    }

    public addItem(collectionName: string, item: any) {
        delete item['id'];
        return this.afDataBase.database.ref(collectionName).push(item);
    }
    public updateItem(collectionName: string, item: any) {
        const id = item.id;
        delete item['id'];
        return this.afDataBase.database.ref(collectionName + '/' + id).update(item);
    }

    public signIn(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    public login(email: string, password: string, shouldRemember: boolean) {
        let persistence = firebase.auth.Auth.Persistence.SESSION;
        if (!shouldRemember) {
            persistence = firebase.auth.Auth.Persistence.NONE;
        }
        return this.afAuth.auth.setPersistence(persistence)
            .then(() => {
                return this.afAuth.auth.signInWithEmailAndPassword(email, password);
            });
    }

    public logout() {
        return this.afAuth.auth.signOut();
    }
}
