import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  isLoading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadMessages();

    setInterval(() => {
      this.loadMessagesForUser();
      // console.log('done');
    }, 3000);
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages) => {
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, messages[i].id);
            }
          }
        })
      )
      .subscribe(
        (messages) => {
          this.messages = messages;
          this.messages.reverse();

        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }
  loadMessagesForUser() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(
        (messages) => {
          this.messages = messages;
          this.messages.reverse();

        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  sendMessage() {
    this.isLoading = true;
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.isLoading = false;
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        (error) => {
          this.isLoading = false;

          this.alertify.error(error.error);
        }
      );
  }
}
