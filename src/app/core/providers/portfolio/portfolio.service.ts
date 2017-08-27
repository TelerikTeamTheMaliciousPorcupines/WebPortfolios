import { Portfolio } from './../../../models/portfolio-model';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './../firebase/firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioService {
    public collectionChange: Observable<any>;
    constructor(private database: FirebaseService) {

        this.collectionChange = new Observable<any>(observer => {
            const onChange = function (databaseSnapshot) {
                const resAsObject = databaseSnapshot.exportVal();
                const resultAsArray = [];
                const keys = Object.keys(resAsObject);
                for (const key of keys) {
                    const portfolio = new Portfolio(resAsObject[key]);
                    resultAsArray.push(portfolio);
                }
                observer.next(resultAsArray);
            };

            database.subscribeToCollectionChange('portfolios', onChange);

        });
    }


    getAll() {
        return this.database.getCollection('portfolios');
    }

    getPortfolio(id: number) {
        return this.getAll()
            .then(portfolios => portfolios.find(portfolio => portfolio.id === id));
    }
}