import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  contacts: Contact[] = [];

  contactSelected = new EventEmitter<Contact>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(index: string): Contact{
    return this.contacts[index];
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
  }

}