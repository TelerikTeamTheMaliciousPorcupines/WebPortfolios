import { MessagesRoutes } from './messages-routing.module';
import { AddMeesageComponent } from './writeMessage/addMeesage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './myMessages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutes
  ],
  declarations: [MessagesComponent, AddMeesageComponent]
})
export class MessagesModule { }