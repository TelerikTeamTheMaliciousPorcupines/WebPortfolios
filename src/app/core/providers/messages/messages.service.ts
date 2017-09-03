import { ActivatedRouteSnapshot } from '@angular/router';
import { Portfolio } from './../../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './../firebase/firebase.service';
import { Injectable } from '@angular/core';
import { Message } from '../../../models/message-model';

@Injectable()
export class MessagesService {

    private email;
    public collectionChange: Observable<any>;
    constructor(private database: FirebaseService, private route: ActivatedRouteSnapshot) {
        this.email = this.route.data['email'];
        this.collectionChange = new Observable<any>(observer => {
            const onChange = function (databaseSnapshot) {
                const resAsObject = databaseSnapshot.exportVal();
                const resultAsArray = [];
                const keys = Object.keys(resAsObject);
                for (const key of keys) {
                    const message = new Message(resAsObject[key]);
                    resultAsArray.push(message);
                }
                observer.next(resultAsArray);
            };

            database.subscribeToCollectionChange(this.createMessagePath(this.email), onChange);

        });
    }


    getAllMessages() {
        return this.database.getCollection(this.createMessagePath(this.email)).then(x => x.map(y => new Message(y)));
    }

    getAllMessageFromUser(userEmail) {
        return this.database.getCollection(this.createMessagePath(this.email))
            .then(allMessages => {
                return allMessages.map(y => new Message(y));
            })
            .then(messages => messages.filter(z => z.from === userEmail));
    }
    addMessage(message: Message) {
        this.database.addItem(this.createMessagePath(message.to), message);
    }

    private createMessagePath(additionalPath): string {
        return 'messages/' + additionalPath;
    }
}
