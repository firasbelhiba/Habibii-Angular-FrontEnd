import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      //replaced function() by ()=>
      this.loadMessages();
      console.log('done');
      // just testing if it is working
    }, 3000);
    //this.loadMessages();

  }



  loadMessages() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(
        (messages) => {
          this.messages = messages;
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }
}