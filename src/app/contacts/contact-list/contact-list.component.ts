import { Component, OnInit} from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../app.component.css', './contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactListChangedEvent
      .subscribe((contacts: Contact[])=> {
        this.contacts = contacts;
      })
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contactsList: Contact[]) => {
        this.contacts = contactsList;
      })
  }
            
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  
  
}