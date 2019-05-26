import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['../../app.component.css', './contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }
}