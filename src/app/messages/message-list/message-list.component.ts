import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../messages.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.subscription = this.messageService.messagesChanged
      .subscribe((messages: Message[]) => {
        this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  
}