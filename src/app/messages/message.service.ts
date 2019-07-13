import { Injectable } from '@angular/core';
import { Message } from './messages.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  messages: Message[] = [];
  messagesChanged = new Subject<Message[]>();
  maxMessageId: number;

  getMessages() {
    this.http
    .get<Message[]>('')
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      this.messages.sort(compareMessagesByID);
      this.messagesChanged.next(this.messages.slice());
    }, (err: any) => {
      console.log(err);
    });
  }

  getMessage(id: string): Message {
    for (let i = 0; i < this.messages.length; i++){
      if (this.messages[i].id ===id){
        return this.messages[i];
      } 
    }
    return null;
  }

  storeMessages() {
    let json = JSON.stringify(this.messages);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http
    .put('', json, {
      headers: header
    }).subscribe(() => {
          this.messagesChanged.next(this.messages.slice());
        });
  }

  addMessage(newMessage: Message) {
    if (newMessage === null) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);
    this.storeMessages();
  }

  getMaxId (): number {
    var maxId = 0;
    for (var i = 0; i < this.messages.length; i++) {
      var currentId = Number(this.messages[i]['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}

function compareMessagesByID(lhs: Message, rhs: Message): number {
  if (lhs.id < rhs.id) {
    return -1;
  } else if (lhs.id === rhs.id) {
    return 0;
  } else {
    return 1;
  }
}
