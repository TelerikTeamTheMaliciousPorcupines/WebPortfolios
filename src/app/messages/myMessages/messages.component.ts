import { MessagesService } from './../../core/providers/messages/messages.service';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message-model';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private currentUserEmail: string;
  public AllMessages: Message[];
  public my_Class = 'modal';
  constructor(private mService: MessagesService, private authService: AuthenthicationService) {

  }
  toggle_class() {
    if (this.my_Class === 'modal') {
      this.my_Class = 'modal--is-visible modal';
    } else {
      this.my_Class = 'modal';
    }
  }
  ngOnInit() {
    this.mService.initChangeListen(this.authService.currentUserEmail);
    this.mService.collectionChange.subscribe(messages => {
      console.log(messages);
      this.AllMessages = messages;
    });
  }

}
