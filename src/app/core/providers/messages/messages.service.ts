import { element } from 'protractor';
import { Portfolio } from './../../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './../firebase/firebase.service';
import { Injectable } from '@angular/core';
import { Message } from '../../../models/message-model';

@Injectable()
export class MessagesService {

    public collectionChange: Observable<Message[]>;
    constructor(private database: FirebaseService) {
    }

    initChangeListen(email: string) {
        this.collectionChange = new Observable<Message[]>(observer => {
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

            this.database.subscribeToCollectionChange(this.createMessagePath(email), onChange);

        });
    }
    getAllMessages(email: string) {
        return this.database.getCollection(this.createMessagePath(email)).then(x => x.map(y => new Message(y)));
    }

    getAllMessageFromUser(userEmail, ownerEmail) {
        return this.database.getCollection(this.createMessagePath(ownerEmail))
            .then(allMessages => {
                return allMessages.map(y => new Message(y));
            })
            .then(messages => messages.filter(z => z.from === userEmail));
    }
    addMessage(message: Message) {
        return this.database.addItem(this.createMessagePath(message.to), message);
    }

    private createMessagePath(additionalPath): string {
        additionalPath = btoa(additionalPath);
        console.log('messages/' + additionalPath);
        return 'messages/' + additionalPath;
    }
}
