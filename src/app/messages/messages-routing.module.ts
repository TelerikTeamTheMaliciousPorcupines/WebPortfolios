import { AddMeesageComponent } from './writeMessage/addMeesage.component';
import { MessagesComponent } from './myMessages/messages.component';
import { AuthGuard } from './../core/providers/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'messages/myMessages', outlet: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/addMessage/:email', component: AddMeesageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MessagesRoutes { }
