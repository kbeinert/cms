import { Component, OnInit} from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['../../app.component.css', './contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
   }

   onNewcontact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
}