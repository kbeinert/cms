import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Message } from '../message.model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef:ElementRef;
  currentSender = '2';
  id = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.messageInputRef.nativeElement.value;
    let newMessage = new Message(this.id, msgSubject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }

}