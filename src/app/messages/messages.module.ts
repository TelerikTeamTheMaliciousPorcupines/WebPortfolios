import { SharedModule } from './../shared/shared.module';
import { MdInputModule, MdButtonModule, MdIconModule } from '@angular/material';
import { MessagesRoutes } from './messages-routing.module';
import { AddMeesageComponent } from './writeMessage/addMeesage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './myMessages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    MessagesRoutes,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
  ],
  declarations: [
    MessagesComponent,
    AddMeesageComponent
  ]
})
export class MessagesModule { }
