import { AuthenthicationService } from './../../core/providers/authentication/authenthication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../models/message-model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './AddMeesage.component.html',
  styleUrls: ['./AddMeesage.component.css']
})
export class AddMeesageComponent implements OnInit, OnDestroy {
  senderEmail: string;
  sub: Subscription;
  protected receiverEmail: any;
  message: Message;
  messageForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authServ: AuthenthicationService) {
    this.message = new Message({});
  }

  ngOnInit() {
    this.senderEmail = this.authServ.currentUserEmail;
    this.sub = this.route.params.subscribe(params => {
      this.receiverEmail = params['email'];
      this.message.to = this.receiverEmail;
    });
    this.messageForm = this.fb.group({
      'text': [this.message.text, Validators.compose([Validators.required, Validators.minLength(15)])]
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendMessage(form) {
    this.message.from = this.senderEmail;
    this.message.text = form.text;
    console.log(this.message);
  }
}
