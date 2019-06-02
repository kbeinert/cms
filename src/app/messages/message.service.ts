import { Injectable, EventEmitter } from '@angular/core';
import{Message} from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  messages: Message[] = [];

  messagesChanged = new EventEmitter<Message[]>();

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let i = 0; i < this.messages.length; i++){
      if (this.messages[i].id ===id){
        return this.messages[i];
      } 
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messagesChanged.emit(this.messages.slice());
  }

}