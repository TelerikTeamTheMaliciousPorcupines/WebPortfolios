import { MessagesService } from './providers/messages/messages.service';
import { MyPortFolioResolver } from './../my-portfolio-form/my-portfolio.resolver.service';
import { PortfolioDetailsResolver } from './../portfolios/portfolio-detail/portfolio-detail.resolver.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { PortfolioService } from './providers/portfolio/portfolio.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './providers/firebase/firebase.service';
import { AuthenthicationService } from './providers/authentication/authenthication.service';
import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './providers/guards/auth-guard.service';

const firebaseConfig = {
  apiKey: 'AIzaSyC7SqPbVmybvSQw27I4Nw3vk5V4viImrbk',
  authDomain: 'telerikproject-f718e.firebaseapp.com',
  databaseURL: 'https://telerikproject-f718e.firebaseio.com',
  projectId: 'telerikproject-f718e',
  storageBucket: 'telerikproject-f718e.appspot.com',
  messagingSenderId: '1083864945864'
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [FirebaseService, AuthenthicationService, AngularFireAuth, PortfolioService,
        AngularFireDatabase, PortfolioDetailsResolver, AuthGuard, MyPortFolioResolver
        , MessagesService]
    };
  }
}
