import { MessagesComponent } from './messages/messages.component';
import { PageNotFoundComponent } from './page-not-fount/page-not-fount.component';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MdProgressSpinnerModule, MdButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MessagesComponent
  ],
  imports: [
    MdProgressSpinnerModule,
    MdButtonModule,
    AuthModule,
    BrowserModule,
    MenuModule,
    CoreModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
