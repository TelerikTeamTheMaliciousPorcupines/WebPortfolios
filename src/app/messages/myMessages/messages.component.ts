import { Subscription, ISubscription } from 'rxjs/Subscription';
import { MessagesService } from './../../core/providers/messages/messages.service';
import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../models/message-model';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  private currentUserEmail: string;
  public AllMessages: Message[];
  constructor(private mService: MessagesService, private authService: AuthenthicationService) {

  }
  toggle_message(index: number) {
    if (this.AllMessages[index]['show']) {
      this.AllMessages[index]['show'] = false;
    } else {
      this.AllMessages[index]['show'] = true;
    }
  }
  ngOnInit() {
    this.mService.initChangeListen(this.authService.currentUserEmail);
    this.subscription = this.mService.collectionChange.subscribe(messages => {
      messages.forEach(x => x['show'] = false);
      this.AllMessages = messages;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
