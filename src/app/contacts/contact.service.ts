import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  contacts: Contact[] = [];
  contactSelected = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  contactsListClone: Contact[];

  getContacts() {
    this.http
    .get<Contact[]>('http://localhost:3000/contacts')
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxID();
      this.contacts.sort(compareContactsByID);
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getContact(id: string): Contact{
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  getMaxID(): number {
    var maxId = 0;
    for(var i = 0; i<this.contacts.length; i++) {
      var currentId = Number(this.contacts[i]['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeContacts() {
    let json = JSON.stringify(this.contacts);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http
    .put('http://localhost:3000/contacts', json, {
      headers: header
    }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}

  function compareContactsByID(lhs: Contact, rhs: Contact): number {
    if (lhs.id < rhs.id) {
      return -1;
    } else if (lhs.id === rhs.id) {
      return 0;
    } else {
      return 1;
    }
  }