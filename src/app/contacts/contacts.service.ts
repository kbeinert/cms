import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  contacts: Contact[] = [];
  contactSelected = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contactsListClone: Contact[];

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(index: string): Contact{
    return this.contacts[index];
  }

  deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return
    }
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || originalContact == undefined || newContact == null || newContact == undefined) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  getMaxId(): number {
    var maxId = 0;
    for(var i = 0; i<this.contacts.length; i++) {
      var currentId = Number(this.contacts[i]['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}