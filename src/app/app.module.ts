import { MessagesModule } from './messages/messages.module';
import { PageNotFoundComponent } from './page-not-fount/page-not-fount.component';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MdProgressSpinnerModule, MdButtonModule } from '@angular/material';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'fade';
  showCloseButton = true;

  positionClass = 'toast-bottom-left';

  maxShown: 3;
}


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    MdProgressSpinnerModule,
    MdButtonModule,
    AuthModule,
    BrowserModule,
    MenuModule,
    CoreModule.forRoot(),
    MessagesModule,
    AppRoutingModule,
    ToastModule.forRoot(),
  ],
  providers: [{ provide: ToastOptions, useClass: CustomOption }],
  bootstrap: [AppComponent]
})
export class AppModule { }
